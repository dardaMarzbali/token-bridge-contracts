/*
 * Copyright 2019-2020, Offchain Labs, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package rollupvalidator

import (
	"context"
	"errors"
	"github.com/offchainlabs/arbitrum/packages/arb-util/machine"
	"github.com/offchainlabs/arbitrum/packages/arb-validator-core/arbbridge"
	"github.com/offchainlabs/arbitrum/packages/arb-validator/rollup"
	"github.com/offchainlabs/arbitrum/packages/arb-validator/structures"
	"log"
	"sync"

	"github.com/offchainlabs/arbitrum/packages/arb-util/common"
	"github.com/offchainlabs/arbitrum/packages/arb-util/value"
	"github.com/offchainlabs/arbitrum/packages/arb-validator-core/evm"
)

type logResponse struct {
	Log     evm.Log
	TxIndex uint64
	TxHash  common.Hash
}

func (l logResponse) Equals(o logResponse) bool {
	return l.Log.Equals(o.Log) &&
		l.TxIndex == o.TxIndex &&
		l.TxHash == o.TxHash
}

// txTracker is thread safe
type txTracker struct {
	rollup.NoopListener
	chainAddress common.Address

	// The RWMutex protects the variables listed below it
	sync.RWMutex
	txDB          *txDB
	maxNodeHeight uint64
	initialized   bool
}

func newTxTracker(
	db machine.CheckpointStorage,
	ns machine.NodeStore,
) (*txTracker, error) {
	txdb, err := newTxDB(db, ns)
	if err != nil {
		return nil, err
	}
	return &txTracker{
		txDB:          txdb,
		maxNodeHeight: 0,
		initialized:   false,
	}, nil
}

// Delete assertion and transaction data from the reorged blocks if there are any
func (tr *txTracker) RestartingFromLatestValid(_ context.Context, _ *rollup.ChainObserver, node *structures.Node) {
	startDepth := node.Depth()
	tr.Lock()
	go func() {
		defer tr.Unlock()
		// First remove any data from reorged nodes
		for i := tr.maxNodeHeight; i > startDepth; i-- {
			if err := tr.txDB.removeUnconfirmedNode(i); err != nil {
				continue
			}
		}
		tr.maxNodeHeight = startDepth
	}()
}

// AddedToChain is called when this listener is initially added to the
// chain. If the listener was already added to a previous chain observer, we
// must be restarting after a reorg and this function does nothing. When this
// method is called for the first time, it processes all nodes that are valid,
// but have not yet been confirmed and saved into the longterm db
func (tr *txTracker) AddedToChain(_ context.Context, chain *rollup.ChainObserver) {
	tr.Lock()
	if tr.initialized {
		tr.Unlock()
		return
	}
	tr.initialized = true
	nodesToProcess := chain.PendingCorrectNodes()
	go func() {
		defer tr.Unlock()
		for _, node := range nodesToProcess {
			_ = tr.processNextNode(node)
		}
	}()
}

func (tr *txTracker) AdvancedKnownNode(_ context.Context, _ *rollup.ChainObserver, node *structures.Node) {
	tr.Lock()
	go func() {
		defer tr.Unlock()
		_ = tr.processNextNode(node)
	}()
}

func (tr *txTracker) ConfirmedNode(_ context.Context, _ *rollup.ChainObserver, ev arbbridge.ConfirmedEvent) {
	tr.Lock()
	go func() {
		defer tr.Unlock()

		if err := tr.txDB.confirmNode(ev.NodeHash); err != nil {
			log.Println(err)
			return
		}
	}()
}

// processNextNode must be called with a write lock
func (tr *txTracker) processNextNode(node *structures.Node) error {
	// We must have already processed this node if it is olded than the latest
	// node that we've seen
	sawOldNode := node.Depth() < tr.maxNodeHeight
	if sawOldNode {
		return nil
	}
	nodeInfo, err := processNode(node)
	if err != nil {
		return err
	}
	if err := tr.txDB.addUnconfirmedNode(nodeInfo); err != nil {
		return err
	}
	tr.maxNodeHeight = node.Depth()
	return nil
}

func (tr *txTracker) OutputMsgVal(ctx context.Context, nodeHash common.Hash, msgIndex int64) (value.Value, error) {
	tr.RLock()
	defer tr.RUnlock()
	select {
	case <-ctx.Done():
		return nil, errors.New("call timed out")
	default:
	}

	height, err := tr.txDB.lookupNodeHeight(nodeHash)
	if err != nil {
		return nil, err
	}

	nodeData, err := tr.txDB.lookupNodeRecord(height, nodeHash)
	if err != nil {
		return nil, err
	}

	if msgIndex < 0 || msgIndex >= int64(len(nodeData.AVMMessages)) {
		return nil, err
	}
	return nodeData.AVMMessages[msgIndex], nil
}

func (tr *txTracker) TxInfo(ctx context.Context, txHash common.Hash) (*evm.TxInfo, error) {
	tr.RLock()
	defer tr.RUnlock()
	select {
	case <-ctx.Done():
		return nil, errors.New("call timed out")
	default:
	}
	tx, err := tr.txDB.lookupTxRecord(txHash)
	if err != nil || tx == nil {
		return nil, err
	}
	nodeInfo, err := tr.txDB.lookupNodeRecord(tx.NodeHeight, tx.NodeHash.Unmarshal())
	if err != nil {
		return nil, nil
	}
	return nodeInfo.getTxInfo(tx.TransactionIndex), nil
}

func (tr *txTracker) AssertionCount(ctx context.Context) (uint64, error) {
	tr.RLock()
	defer tr.RUnlock()
	select {
	case <-ctx.Done():
		return 0, errors.New("call timed out")
	default:
	}
	return tr.maxNodeHeight, nil
}

func (tr *txTracker) FindLogs(
	ctx context.Context,
	fromHeight *uint64,
	toHeight *uint64,
	address []common.Address,
	topics [][]common.Hash,
) ([]evm.FullLog, error) {
	tr.RLock()
	defer tr.RUnlock()
	select {
	case <-ctx.Done():
		return nil, errors.New("call timed out")
	default:
	}
	startHeight := uint64(0)
	endHeight := tr.maxNodeHeight
	if fromHeight != nil && *fromHeight > 0 {
		startHeight = *fromHeight
	}
	if toHeight != nil {
		altEndHeight := *toHeight + 1
		if endHeight > altEndHeight {
			endHeight = altEndHeight
		}
	}
	logs := make([]evm.FullLog, 0)
	if startHeight >= tr.maxNodeHeight {
		return logs, nil
	}

	for i := startHeight; i <= endHeight; i++ {
		select {
		case <-ctx.Done():
			return nil, errors.New("call timed out")
		default:
		}
		nodeHash, err := tr.txDB.lookupNodeHash(i)
		if err != nil {
			continue
		}
		metadata, err := tr.txDB.lookupNodeMetadata(i, nodeHash)
		if err != nil {
			continue
		}

		if !metadata.MaybeMatchesLogQuery(address, topics) {
			continue
		}

		info, err := tr.txDB.lookupNodeRecord(i, nodeHash)
		if err != nil {
			continue
		}
		logs = append(logs, info.FindLogs(address, topics)...)
	}
	return logs, nil
}
