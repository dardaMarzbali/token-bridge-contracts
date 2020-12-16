/*
 * Copyright 2019, Offchain Labs, Inc.
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

package machine

import (
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/offchainlabs/arbitrum/packages/arb-util/common"
	"github.com/offchainlabs/arbitrum/packages/arb-util/value"
	"github.com/pkg/errors"
	"sync"
)

type BlockInfo struct {
	BlockLog value.Value
	Header   *types.Header
}

type AggregatorStore interface {
	GetMessage(index uint64) (value.Value, error)
	GetLog(index uint64) (value.Value, error)
	GetPossibleRequestInfo(requestId common.Hash) *uint64
	GetPossibleBlock(blockHash common.Hash) *uint64
	GetBlock(height uint64) (*BlockInfo, error)
	LatestBlock() (*common.BlockId, error)

	SaveLog(val value.Value) error
	SaveMessage(val value.Value) error
	SaveBlock(header *types.Header, logIndex uint64) error
	SaveEmptyBlock(header *types.Header) error
	SaveBlockHash(blockHash common.Hash, blockHeight uint64) error
	SaveRequest(requestId common.Hash, logIndex uint64) error
	Reorg(height uint64, messageCount uint64, logCount uint64) error
}

type BlockEntry struct {
	header   *types.Header
	logIndex *uint64
}

type InMemoryAggregatorStore struct {
	sync.Mutex
	messages     []value.Value
	logs         []value.Value
	blocks       []*BlockEntry
	requestIndex map[common.Hash]uint64
	blockIndex   map[common.Hash]uint64
}

func NewInMemoryAggregatorStore() *InMemoryAggregatorStore {
	return &InMemoryAggregatorStore{
		requestIndex: make(map[common.Hash]uint64),
		blockIndex:   make(map[common.Hash]uint64),
	}
}

func (as *InMemoryAggregatorStore) GetMessage(index uint64) (value.Value, error) {
	as.Lock()
	defer as.Unlock()
	if index >= uint64(len(as.messages)) {
		return nil, errors.New("failed to get l2message")
	}
	return as.messages[index], nil
}

func (as *InMemoryAggregatorStore) GetLog(index uint64) (value.Value, error) {
	as.Lock()
	defer as.Unlock()
	if index >= uint64(len(as.logs)) {
		return nil, errors.New("failed to get log")
	}
	return as.logs[index], nil
}

func (as *InMemoryAggregatorStore) GetPossibleRequestInfo(requestId common.Hash) *uint64 {
	as.Lock()
	defer as.Unlock()
	request, ok := as.requestIndex[requestId]
	if !ok {
		return nil
	}
	return &request
}

func (as *InMemoryAggregatorStore) GetPossibleBlock(blockHash common.Hash) *uint64 {
	as.Lock()
	defer as.Unlock()
	block, ok := as.blockIndex[blockHash]
	if !ok {
		return nil
	}
	return &block
}

func (as *InMemoryAggregatorStore) GetBlock(height uint64) (*BlockInfo, error) {
	as.Lock()
	defer as.Unlock()
	if height > uint64(len(as.blocks)) {
		return nil, nil
	}
	var blockLog value.Value
	rawBlock := as.blocks[height]
	if rawBlock.logIndex != nil {
		blockLog = as.logs[*rawBlock.logIndex]
	}
	return &BlockInfo{
		BlockLog: blockLog,
		Header:   rawBlock.header,
	}, nil
}

func (as *InMemoryAggregatorStore) LatestBlock() (*common.BlockId, error) {
	as.Lock()
	defer as.Unlock()
	if len(as.blocks) == 0 {
		return nil, errors.New("No blocks")
	}
	block := as.blocks[len(as.blocks)-1]
	return &common.BlockId{
		Height:     common.NewTimeBlocksInt(int64(len(as.blocks)) - 1),
		HeaderHash: common.NewHashFromEth(block.header.Hash()),
	}, nil
}

func (as *InMemoryAggregatorStore) SaveLog(val value.Value) error {
	as.Lock()
	defer as.Unlock()
	as.logs = append(as.logs, val)
	return nil
}

func (as *InMemoryAggregatorStore) SaveMessage(val value.Value) error {
	as.Lock()
	defer as.Unlock()
	as.messages = append(as.messages, val)
	return nil
}

func (as *InMemoryAggregatorStore) SaveBlock(header *types.Header, logIndex uint64) error {
	as.Lock()
	defer as.Unlock()
	as.blocks = append(as.blocks, &BlockEntry{
		header:   header,
		logIndex: &logIndex,
	})
	return nil
}

func (as *InMemoryAggregatorStore) SaveEmptyBlock(header *types.Header) error {
	as.Lock()
	defer as.Unlock()
	as.blocks = append(as.blocks, &BlockEntry{
		header: header,
	})
	return nil
}

func (as *InMemoryAggregatorStore) SaveBlockHash(blockHash common.Hash, blockHeight uint64) error {
	as.Lock()
	defer as.Unlock()
	as.blockIndex[blockHash] = blockHeight
	return nil
}

func (as *InMemoryAggregatorStore) SaveRequest(requestId common.Hash, logIndex uint64) error {
	as.Lock()
	defer as.Unlock()
	as.requestIndex[requestId] = logIndex
	return nil
}

func (as *InMemoryAggregatorStore) Reorg(height uint64, messageCount uint64, logCount uint64) error {
	as.Lock()
	defer as.Unlock()
	as.messages = as.messages[:messageCount]
	as.logs = as.logs[:logCount]
	as.blocks = as.blocks[:height]
	return nil
}
