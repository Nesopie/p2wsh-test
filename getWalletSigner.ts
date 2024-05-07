import {
    BitcoinNetwork,
    BitcoinPaths,
    mnemonicToPrivateKey,
} from "@catalogfi/wallets";

import * as ecc from "tiny-secp256k1";
import { ECPairFactory } from "ecpair";
import * as bitcoin from "bitcoinjs-lib";

const ECPair = ECPairFactory(ecc);

export const getBitcoinNetwork = (
    network: BitcoinNetwork
): bitcoin.networks.Network => {
    return network === BitcoinNetwork.Mainnet
        ? bitcoin.networks.bitcoin
        : network === BitcoinNetwork.Testnet
        ? bitcoin.networks.testnet
        : bitcoin.networks.regtest;
};

export const getWalletSigner = (
    mnemonic: string,
    network: BitcoinNetwork,
    index: number
) => {
    const path = BitcoinPaths.bip84(network, index);
    const privateKey = mnemonicToPrivateKey(mnemonic, network, {
        path,
    });

    const buf = Buffer.from(privateKey, "hex");

    console.log(buf);

    const signer = ECPair.fromPrivateKey(buf, {
        network: getBitcoinNetwork(network),
    });

    return signer;
};

export const hash160 = (buf: Buffer) => {
    return bitcoin.crypto.ripemd160(bitcoin.crypto.sha256(buf));
};
