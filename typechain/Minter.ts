/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export type OutpointStruct = { spk: BytesLike; amount: BigNumberish };

export type OutpointStructOutput = [spk: string, amount: bigint] & {
  spk: string;
  amount: bigint;
};

export type BlockHeaderStruct = {
  version: BytesLike;
  timestamp: BytesLike;
  nBits: BytesLike;
  nonce: BytesLike;
  previousBlockHash: BytesLike;
  merkleRootHash: BytesLike;
};

export type BlockHeaderStructOutput = [
  version: string,
  timestamp: string,
  nBits: string,
  nonce: string,
  previousBlockHash: string,
  merkleRootHash: string
] & {
  version: string;
  timestamp: string;
  nBits: string;
  nonce: string;
  previousBlockHash: string;
  merkleRootHash: string;
};

export interface MinterInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "TxIDS"
      | "WhitelistedAddresses"
      | "WhitelistedAddressesArr"
      | "createP2wshSpkForHtlc"
      | "extractMintMetadata"
      | "getWhiteListedAddresses"
      | "mtlc"
      | "parseTx"
      | "register"
      | "registerTx"
      | "spvVerifier"
      | "token"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "TxIDS", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "WhitelistedAddresses",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "WhitelistedAddressesArr",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createP2wshSpkForHtlc",
    values: [BytesLike, AddressLike, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "extractMintMetadata",
    values: [OutpointStruct[], BytesLike, AddressLike, AddressLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getWhiteListedAddresses",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "mtlc", values?: undefined): string;
  encodeFunctionData(functionFragment: "parseTx", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "register",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "registerTx",
    values: [
      BlockHeaderStruct[],
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike[],
      BytesLike,
      AddressLike,
      AddressLike,
      AddressLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "spvVerifier",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;

  decodeFunctionResult(functionFragment: "TxIDS", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "WhitelistedAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "WhitelistedAddressesArr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createP2wshSpkForHtlc",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "extractMintMetadata",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWhiteListedAddresses",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mtlc", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "parseTx", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "register", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registerTx", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "spvVerifier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
}

export interface Minter extends BaseContract {
  connect(runner?: ContractRunner | null): Minter;
  waitForDeployment(): Promise<this>;

  interface: MinterInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  TxIDS: TypedContractMethod<[arg0: BytesLike], [boolean], "view">;

  WhitelistedAddresses: TypedContractMethod<
    [arg0: AddressLike],
    [boolean],
    "view"
  >;

  WhitelistedAddressesArr: TypedContractMethod<
    [arg0: BigNumberish],
    [string],
    "view"
  >;

  createP2wshSpkForHtlc: TypedContractMethod<
    [
      secretHash: BytesLike,
      minterBtcAddress: AddressLike,
      userBtcAddress: AddressLike,
      mintTokensTo: AddressLike
    ],
    [string],
    "view"
  >;

  extractMintMetadata: TypedContractMethod<
    [
      outpoints: OutpointStruct[],
      secretHash: BytesLike,
      minterBtcAddress: AddressLike,
      userBtcAddress: AddressLike,
      mintTokensTo: AddressLike
    ],
    [bigint],
    "view"
  >;

  getWhiteListedAddresses: TypedContractMethod<[], [string[]], "view">;

  mtlc: TypedContractMethod<[], [string], "view">;

  parseTx: TypedContractMethod<
    [txHex: BytesLike],
    [[string, OutpointStructOutput[]]],
    "view"
  >;

  register: TypedContractMethod<[spk: AddressLike], [void], "nonpayable">;

  registerTx: TypedContractMethod<
    [
      blockSequence: BlockHeaderStruct[],
      blockIndex: BigNumberish,
      txIndex: BigNumberish,
      txHex: BytesLike,
      proof: BytesLike[],
      secretHash: BytesLike,
      minterBtcAddress: AddressLike,
      userBtcAddress: AddressLike,
      mintTokensTo: AddressLike
    ],
    [void],
    "nonpayable"
  >;

  spvVerifier: TypedContractMethod<[], [string], "view">;

  token: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "TxIDS"
  ): TypedContractMethod<[arg0: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "WhitelistedAddresses"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "WhitelistedAddressesArr"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "createP2wshSpkForHtlc"
  ): TypedContractMethod<
    [
      secretHash: BytesLike,
      minterBtcAddress: AddressLike,
      userBtcAddress: AddressLike,
      mintTokensTo: AddressLike
    ],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "extractMintMetadata"
  ): TypedContractMethod<
    [
      outpoints: OutpointStruct[],
      secretHash: BytesLike,
      minterBtcAddress: AddressLike,
      userBtcAddress: AddressLike,
      mintTokensTo: AddressLike
    ],
    [bigint],
    "view"
  >;
  getFunction(
    nameOrSignature: "getWhiteListedAddresses"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "mtlc"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "parseTx"
  ): TypedContractMethod<
    [txHex: BytesLike],
    [[string, OutpointStructOutput[]]],
    "view"
  >;
  getFunction(
    nameOrSignature: "register"
  ): TypedContractMethod<[spk: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "registerTx"
  ): TypedContractMethod<
    [
      blockSequence: BlockHeaderStruct[],
      blockIndex: BigNumberish,
      txIndex: BigNumberish,
      txHex: BytesLike,
      proof: BytesLike[],
      secretHash: BytesLike,
      minterBtcAddress: AddressLike,
      userBtcAddress: AddressLike,
      mintTokensTo: AddressLike
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "spvVerifier"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "token"
  ): TypedContractMethod<[], [string], "view">;

  filters: {};
}
