/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  Verifier,
  VerifierInterface,
  BlockHeaderStruct,
} from "../Verifier";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes4",
            name: "version",
            type: "bytes4",
          },
          {
            internalType: "bytes4",
            name: "timestamp",
            type: "bytes4",
          },
          {
            internalType: "bytes4",
            name: "nBits",
            type: "bytes4",
          },
          {
            internalType: "bytes4",
            name: "nonce",
            type: "bytes4",
          },
          {
            internalType: "bytes32",
            name: "previousBlockHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "merkleRootHash",
            type: "bytes32",
          },
        ],
        internalType: "struct BlockHeader",
        name: "genesisHeader",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
    ],
    name: "BlockRegistered",
    type: "event",
  },
  {
    inputs: [],
    name: "LDEBlockHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "blockHeaders",
    outputs: [
      {
        internalType: "bytes4",
        name: "version",
        type: "bytes4",
      },
      {
        internalType: "bytes4",
        name: "timestamp",
        type: "bytes4",
      },
      {
        internalType: "bytes4",
        name: "nBits",
        type: "bytes4",
      },
      {
        internalType: "bytes4",
        name: "nonce",
        type: "bytes4",
      },
      {
        internalType: "bytes32",
        name: "previousBlockHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "merkleRootHash",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "epoch",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes4",
            name: "version",
            type: "bytes4",
          },
          {
            internalType: "bytes4",
            name: "timestamp",
            type: "bytes4",
          },
          {
            internalType: "bytes4",
            name: "nBits",
            type: "bytes4",
          },
          {
            internalType: "bytes4",
            name: "nonce",
            type: "bytes4",
          },
          {
            internalType: "bytes32",
            name: "previousBlockHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "merkleRootHash",
            type: "bytes32",
          },
        ],
        internalType: "struct BlockHeader[]",
        name: "newEpoch",
        type: "tuple[]",
      },
    ],
    name: "registerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes4",
            name: "version",
            type: "bytes4",
          },
          {
            internalType: "bytes4",
            name: "timestamp",
            type: "bytes4",
          },
          {
            internalType: "bytes4",
            name: "nBits",
            type: "bytes4",
          },
          {
            internalType: "bytes4",
            name: "nonce",
            type: "bytes4",
          },
          {
            internalType: "bytes32",
            name: "previousBlockHash",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "merkleRootHash",
            type: "bytes32",
          },
        ],
        internalType: "struct BlockHeader[]",
        name: "blockSequence",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "blockIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "txIndex",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
    ],
    name: "verifyTxInclusion",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class Verifier__factory {
  static readonly abi = _abi;
  static createInterface(): VerifierInterface {
    return new Interface(_abi) as VerifierInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Verifier {
    return new Contract(address, _abi, runner) as unknown as Verifier;
  }
}