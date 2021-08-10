/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from 'ethers'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'
import { TypedEventFilter, TypedEvent, TypedListener } from './commons'

interface ISequencerInboxInterface extends ethers.utils.Interface {
  functions: {
    'getInboxAccsLength()': FunctionFragment
    'inboxAccs(uint256)': FunctionFragment
    'maxDelayBlocks()': FunctionFragment
    'maxDelaySeconds()': FunctionFragment
    'messageCount()': FunctionFragment
    'proveBatchContainsSequenceNumber(bytes,uint256)': FunctionFragment
    'setSequencer(address)': FunctionFragment
  }

  encodeFunctionData(
    functionFragment: 'getInboxAccsLength',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'inboxAccs',
    values: [BigNumberish]
  ): string
  encodeFunctionData(
    functionFragment: 'maxDelayBlocks',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'maxDelaySeconds',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'messageCount',
    values?: undefined
  ): string
  encodeFunctionData(
    functionFragment: 'proveBatchContainsSequenceNumber',
    values: [BytesLike, BigNumberish]
  ): string
  encodeFunctionData(functionFragment: 'setSequencer', values: [string]): string

  decodeFunctionResult(
    functionFragment: 'getInboxAccsLength',
    data: BytesLike
  ): Result
  decodeFunctionResult(functionFragment: 'inboxAccs', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'maxDelayBlocks',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'maxDelaySeconds',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'messageCount',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'proveBatchContainsSequenceNumber',
    data: BytesLike
  ): Result
  decodeFunctionResult(
    functionFragment: 'setSequencer',
    data: BytesLike
  ): Result

  events: {
    'DelayedInboxForced(uint256,bytes32,uint256,uint256,bytes32[2],uint256)': EventFragment
    'SequencerAddressUpdated(address)': EventFragment
    'SequencerBatchDelivered(uint256,bytes32,uint256,bytes32,bytes,uint256[],uint256[],uint256,address)': EventFragment
    'SequencerBatchDeliveredFromOrigin(uint256,bytes32,uint256,bytes32,uint256)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'DelayedInboxForced'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'SequencerAddressUpdated'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'SequencerBatchDelivered'): EventFragment
  getEvent(
    nameOrSignatureOrTopic: 'SequencerBatchDeliveredFromOrigin'
  ): EventFragment
}

export class ISequencerInbox extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this

  listeners(eventName?: string): Array<Listener>
  off(eventName: string, listener: Listener): this
  on(eventName: string, listener: Listener): this
  once(eventName: string, listener: Listener): this
  removeListener(eventName: string, listener: Listener): this
  removeAllListeners(eventName?: string): this

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>

  interface: ISequencerInboxInterface

  functions: {
    getInboxAccsLength(overrides?: CallOverrides): Promise<[BigNumber]>

    inboxAccs(index: BigNumberish, overrides?: CallOverrides): Promise<[string]>

    maxDelayBlocks(overrides?: CallOverrides): Promise<[BigNumber]>

    maxDelaySeconds(overrides?: CallOverrides): Promise<[BigNumber]>

    messageCount(overrides?: CallOverrides): Promise<[BigNumber]>

    proveBatchContainsSequenceNumber(
      proof: BytesLike,
      inboxCount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string]>

    setSequencer(
      newSequencer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>
  }

  getInboxAccsLength(overrides?: CallOverrides): Promise<BigNumber>

  inboxAccs(index: BigNumberish, overrides?: CallOverrides): Promise<string>

  maxDelayBlocks(overrides?: CallOverrides): Promise<BigNumber>

  maxDelaySeconds(overrides?: CallOverrides): Promise<BigNumber>

  messageCount(overrides?: CallOverrides): Promise<BigNumber>

  proveBatchContainsSequenceNumber(
    proof: BytesLike,
    inboxCount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, string]>

  setSequencer(
    newSequencer: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  callStatic: {
    getInboxAccsLength(overrides?: CallOverrides): Promise<BigNumber>

    inboxAccs(index: BigNumberish, overrides?: CallOverrides): Promise<string>

    maxDelayBlocks(overrides?: CallOverrides): Promise<BigNumber>

    maxDelaySeconds(overrides?: CallOverrides): Promise<BigNumber>

    messageCount(overrides?: CallOverrides): Promise<BigNumber>

    proveBatchContainsSequenceNumber(
      proof: BytesLike,
      inboxCount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string]>

    setSequencer(newSequencer: string, overrides?: CallOverrides): Promise<void>
  }

  filters: {
    DelayedInboxForced(
      firstMessageNum?: BigNumberish | null,
      beforeAcc?: BytesLike | null,
      newMessageCount?: null,
      totalDelayedMessagesRead?: null,
      afterAccAndDelayed?: null,
      seqBatchIndex?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber, BigNumber, [string, string], BigNumber],
      {
        firstMessageNum: BigNumber
        beforeAcc: string
        newMessageCount: BigNumber
        totalDelayedMessagesRead: BigNumber
        afterAccAndDelayed: [string, string]
        seqBatchIndex: BigNumber
      }
    >

    SequencerAddressUpdated(
      newAddress?: null
    ): TypedEventFilter<[string], { newAddress: string }>

    SequencerBatchDelivered(
      firstMessageNum?: BigNumberish | null,
      beforeAcc?: BytesLike | null,
      newMessageCount?: null,
      afterAcc?: null,
      transactions?: null,
      lengths?: null,
      sectionsMetadata?: null,
      seqBatchIndex?: null,
      sequencer?: null
    ): TypedEventFilter<
      [
        BigNumber,
        string,
        BigNumber,
        string,
        string,
        BigNumber[],
        BigNumber[],
        BigNumber,
        string
      ],
      {
        firstMessageNum: BigNumber
        beforeAcc: string
        newMessageCount: BigNumber
        afterAcc: string
        transactions: string
        lengths: BigNumber[]
        sectionsMetadata: BigNumber[]
        seqBatchIndex: BigNumber
        sequencer: string
      }
    >

    SequencerBatchDeliveredFromOrigin(
      firstMessageNum?: BigNumberish | null,
      beforeAcc?: BytesLike | null,
      newMessageCount?: null,
      afterAcc?: null,
      seqBatchIndex?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber, string, BigNumber],
      {
        firstMessageNum: BigNumber
        beforeAcc: string
        newMessageCount: BigNumber
        afterAcc: string
        seqBatchIndex: BigNumber
      }
    >
  }

  estimateGas: {
    getInboxAccsLength(overrides?: CallOverrides): Promise<BigNumber>

    inboxAccs(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    maxDelayBlocks(overrides?: CallOverrides): Promise<BigNumber>

    maxDelaySeconds(overrides?: CallOverrides): Promise<BigNumber>

    messageCount(overrides?: CallOverrides): Promise<BigNumber>

    proveBatchContainsSequenceNumber(
      proof: BytesLike,
      inboxCount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    setSequencer(
      newSequencer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>
  }

  populateTransaction: {
    getInboxAccsLength(overrides?: CallOverrides): Promise<PopulatedTransaction>

    inboxAccs(
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    maxDelayBlocks(overrides?: CallOverrides): Promise<PopulatedTransaction>

    maxDelaySeconds(overrides?: CallOverrides): Promise<PopulatedTransaction>

    messageCount(overrides?: CallOverrides): Promise<PopulatedTransaction>

    proveBatchContainsSequenceNumber(
      proof: BytesLike,
      inboxCount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    setSequencer(
      newSequencer: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>
  }
}
