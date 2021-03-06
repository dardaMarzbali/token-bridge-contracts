/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from 'ethers'
import { Provider, TransactionRequest } from '@ethersproject/providers'
import { Contract, ContractFactory, Overrides } from '@ethersproject/contracts'

import { StandardArbERC20 } from './StandardArbERC20'

export class StandardArbERC20Factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer)
  }

  deploy(overrides?: Overrides): Promise<StandardArbERC20> {
    return super.deploy(overrides || {}) as Promise<StandardArbERC20>
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {})
  }
  attach(address: string): StandardArbERC20 {
    return super.attach(address) as StandardArbERC20
  }
  connect(signer: Signer): StandardArbERC20Factory {
    return super.connect(signer) as StandardArbERC20Factory
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StandardArbERC20 {
    return new Contract(address, _abi, signerOrProvider) as StandardArbERC20
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'bridge',
    outputs: [
      {
        internalType: 'contract ArbTokenBridge',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'bridgeMint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'subtractedValue',
        type: 'uint256',
      },
    ],
    name: 'decreaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'addedValue',
        type: 'uint256',
      },
    ],
    name: 'increaseAllowance',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_bridge',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_l1Address',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'decimals_',
        type: 'uint8',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isMaster',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'l1Address',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'target',
        type: 'address',
      },
    ],
    name: 'migrate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'newName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'newSymbol',
        type: 'string',
      },
    ],
    name: 'updateInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'destination',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const _bytecode =
  '0x608060405234801561001057600080fd5b506005805461ff0019166101001790556112778061002f6000396000f3fe608060405234801561001057600080fd5b50600436106101115760003560e01c806370a08231116100ad578063a9059cbb11610071578063a9059cbb1461048c578063c2eeeebd146104b8578063dd62ed3e146104dc578063e78cea921461050a578063f3fef3a31461051257610111565b806370a08231146103cc57806389232a00146103f25780638c2a993e1461042c57806395d89b4114610458578063a457c2d71461046057610111565b806306fdde0314610116578063095ea7b31461019357806318160ddd146101d357806323b872dd146101ed578063313ce567146102235780633950935114610241578063405b84fa1461026d57806347d5a0911461029b5780636f791d29146103c4575b600080fd5b61011e61053e565b6040805160208082528351818301528351919283929083019185019080838360005b83811015610158578181015183820152602001610140565b50505050905090810190601f1680156101855780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101bf600480360360408110156101a957600080fd5b506001600160a01b0381351690602001356105d5565b604080519115158252519081900360200190f35b6101db6105f2565b60408051918252519081900360200190f35b6101bf6004803603606081101561020357600080fd5b506001600160a01b038135811691602081013590911690604001356105f8565b61022b610685565b6040805160ff9092168252519081900360200190f35b6101bf6004803603604081101561025757600080fd5b506001600160a01b03813516906020013561068e565b6102996004803603604081101561028357600080fd5b50803590602001356001600160a01b03166106e2565b005b610299600480360360408110156102b157600080fd5b810190602081018135600160201b8111156102cb57600080fd5b8201836020820111156102dd57600080fd5b803590602001918460018302840111600160201b831117156102fe57600080fd5b91908080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152509295949360208101935035915050600160201b81111561035057600080fd5b82018360208201111561036257600080fd5b803590602001918460018302840111600160201b8311171561038357600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610775945050505050565b6101bf610804565b6101db600480360360208110156103e257600080fd5b50356001600160a01b0316610812565b6102996004803603606081101561040857600080fd5b5080356001600160a01b03908116916020810135909116906040013560ff1661082d565b6102996004803603604081101561044257600080fd5b506001600160a01b0381351690602001356108cb565b61011e610928565b6101bf6004803603604081101561047657600080fd5b506001600160a01b038135169060200135610989565b6101bf600480360360408110156104a257600080fd5b506001600160a01b0381351690602001356109f7565b6104c0610a0b565b604080516001600160a01b039092168252519081900360200190f35b6101db600480360360408110156104f257600080fd5b506001600160a01b0381358116916020013516610a1a565b6104c0610a45565b6102996004803603604081101561052857600080fd5b506001600160a01b038135169060200135610a5a565b60038054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156105ca5780601f1061059f576101008083540402835291602001916105ca565b820191906000526020600020905b8154815290600101906020018083116105ad57829003601f168201915b505050505090505b90565b60006105e96105e2610acb565b8484610acf565b50600192915050565b60025490565b6000610605848484610bbb565b61067b84610611610acb565b6106768560405180606001604052806028815260200161116b602891396001600160a01b038a1660009081526001602052604081209061064f610acb565b6001600160a01b03168152602081019190915260400160002054919063ffffffff610d1016565b610acf565b5060019392505050565b60055460ff1690565b60006105e961069b610acb565b8461067685600160006106ac610acb565b6001600160a01b03908116825260208083019390935260409182016000908120918c16815292529020549063ffffffff610da716565b6106ec3383610e08565b60055460065460408051630d3f3fc360e21b81526001600160a01b039283166004820152848316602482015233604482015260648101869052905162010000909304909116916334fcff0c9160848082019260009290919082900301818387803b15801561075957600080fd5b505af115801561076d573d6000803e3d6000fd5b505050505050565b6005546201000090046001600160a01b031633146107c8576040805162461bcd60e51b815260206004820152600b60248201526a4f4e4c595f42524944474560a81b604482015290519081900360640190fd5b8151156107e45781516107e2906003906020850190611045565b505b8051156108005780516107fe906004906020840190611045565b505b5050565b600554610100900460ff1690565b6001600160a01b031660009081526020819052604090205490565b6005546201000090046001600160a01b031615610880576040805162461bcd60e51b815260206004820152600c60248201526b1053149150511657d253925560a21b604482015290519081900360640190fd5b60058054600680546001600160a01b0319166001600160a01b0395861617905562010000600160b01b0319166201000094909316939093029190911760ff191660ff91909116179055565b6005546201000090046001600160a01b0316331461091e576040805162461bcd60e51b815260206004820152600b60248201526a4f4e4c595f42524944474560a81b604482015290519081900360640190fd5b6108008282610efe565b60048054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156105ca5780601f1061059f576101008083540402835291602001916105ca565b60006105e9610996610acb565b846106768560405180606001604052806025815260200161121d60259139600160006109c0610acb565b6001600160a01b03908116825260208083019390935260409182016000908120918d1681529252902054919063ffffffff610d1016565b60006105e9610a04610acb565b8484610bbb565b6006546001600160a01b031681565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6005546201000090046001600160a01b031681565b610a643382610e08565b60055460065460408051636ce5768960e11b81526001600160a01b0392831660048201528583166024820152604481018590529051620100009093049091169163d9caed129160648082019260009290919082900301818387803b15801561075957600080fd5b3390565b6001600160a01b038316610b145760405162461bcd60e51b81526004018080602001828103825260248152602001806111f96024913960400191505060405180910390fd5b6001600160a01b038216610b595760405162461bcd60e51b81526004018080602001828103825260228152602001806111236022913960400191505060405180910390fd5b6001600160a01b03808416600081815260016020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b6001600160a01b038316610c005760405162461bcd60e51b81526004018080602001828103825260258152602001806111d46025913960400191505060405180910390fd5b6001600160a01b038216610c455760405162461bcd60e51b81526004018080602001828103825260238152602001806110de6023913960400191505060405180910390fd5b610c508383836107fe565b610c9381604051806060016040528060268152602001611145602691396001600160a01b038616600090815260208190526040902054919063ffffffff610d1016565b6001600160a01b038085166000908152602081905260408082209390935590841681522054610cc8908263ffffffff610da716565b6001600160a01b0380841660008181526020818152604091829020949094558051858152905191939287169260008051602061119383398151915292918290030190a3505050565b60008184841115610d9f5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610d64578181015183820152602001610d4c565b50505050905090810190601f168015610d915780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b600082820183811015610e01576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b6001600160a01b038216610e4d5760405162461bcd60e51b81526004018080602001828103825260218152602001806111b36021913960400191505060405180910390fd5b610e59826000836107fe565b610e9c81604051806060016040528060228152602001611101602291396001600160a01b038516600090815260208190526040902054919063ffffffff610d1016565b6001600160a01b038316600090815260208190526040902055600254610ec8908263ffffffff610fe816565b6002556040805182815290516000916001600160a01b038516916000805160206111938339815191529181900360200190a35050565b6001600160a01b038216610f59576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b610f65600083836107fe565b600254610f78908263ffffffff610da716565b6002556001600160a01b038216600090815260208190526040902054610fa4908263ffffffff610da716565b6001600160a01b0383166000818152602081815260408083209490945583518581529351929391926000805160206111938339815191529281900390910190a35050565b60008282111561103f576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061108657805160ff19168380011785556110b3565b828001600101855582156110b3579182015b828111156110b3578251825591602001919060010190611098565b506110bf9291506110c3565b5090565b6105d291905b808211156110bf57600081556001016110c956fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a206275726e20616d6f756e7420657863656564732062616c616e636545524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e6365ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef45524332303a206275726e2066726f6d20746865207a65726f206164647265737345524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f206164647265737345524332303a2064656372656173656420616c6c6f77616e63652062656c6f77207a65726fa2646970667358221220f1c951648c252f74920dc5c94b3368da883e112f28af5dd3365ffc1bda913f0c64736f6c634300060b0033'
