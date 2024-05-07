import {
    BitcoinNetwork,
    BitcoinProvider,
    BitcoinWallet,
    generateMnemonic,
} from "@catalogfi/wallets";
import * as bitcoin from "bitcoinjs-lib";
import * as crypto from "crypto";
import { getBitcoinNetwork, getWalletSigner } from "./getWalletSigner";
import { hash160, sha256 } from "bitcoinjs-lib/src/crypto";
import { fromBase58Check, fromBech32 } from "bitcoinjs-lib/src/address";

const FEE = 2000;
const randomAddress = "bcrt1qcywfsrrmruczxnv0jj9gjx0tjxde3lauvt5am8";
const network = BitcoinNetwork.Regtest;
const bitcoinNetwork = getBitcoinNetwork(network);

const htlcScript = (
    secretHash: string,
    theirAddress: string,
    myAddress: string
) => {
    const getFormattedAddress = (address: string) => {
        try {
            address = fromBech32(address).data.toString("hex");
        } catch (err) {
            if (
                err.message.includes("Mixed-case string") ||
                err.message.includes("too short")
            ) {
                address = fromBase58Check(address).hash.toString("hex");
            } else throw new Error(err);
        }
        return address;
    };

    console.log(getFormattedAddress(theirAddress));
    console.log(getFormattedAddress(myAddress));

    const script = bitcoin.script.compile([
        bitcoin.script.OPS.OP_IF, //1
        bitcoin.script.OPS.OP_SHA256, //1
        Buffer.from(secretHash, "hex"), //32
        bitcoin.script.OPS.OP_EQUALVERIFY, //1
        bitcoin.script.OPS.OP_DUP, //1
        bitcoin.script.OPS.OP_HASH160, //1
        Buffer.from(getFormattedAddress(theirAddress), "hex"), //20
        bitcoin.script.OPS.OP_ELSE, //1
        bitcoin.script.number.encode(2), //1
        bitcoin.script.OPS.OP_CHECKSEQUENCEVERIFY, //1
        bitcoin.script.OPS.OP_DROP, //1
        bitcoin.script.OPS.OP_DUP, //1
        bitcoin.script.OPS.OP_HASH160, //1
        Buffer.from(getFormattedAddress(myAddress), "hex"), //20
        bitcoin.script.OPS.OP_ENDIF, //1
        bitcoin.script.OPS.OP_EQUALVERIFY, //1
        bitcoin.script.OPS.OP_CHECKSIG, //1
    ]);

    console.log(Buffer.from(script).toString("hex"));
    console.log(script.length);
    console.log(bitcoin.script.decompile(script));
    console.log(sha256(script).toString("hex"));

    const p2wsh = bitcoin.payments.p2wsh({
        // redeem: script,
        redeem: {
            output: script,
        },
        network: bitcoinNetwork,
    });

    return p2wsh;
};

const secret = "DITTO-" + 1;
const secretHash = crypto.createHash("sha256").update(secret).digest("hex");

const mnemonic =
    "annual script valid globe legend innocent vocal wrestle zoo night awesome issue";
const provider = new BitcoinProvider(
    BitcoinNetwork.Regtest,
    "http://localhost:30000"
);

const walletStore = new Map<string, string>();

const wallet = BitcoinWallet.fromMnemonic(mnemonic, provider);
const signer = getWalletSigner(mnemonic, network, 0);

(async () => {
    const myAddress = await wallet.getAddress();

    const p2wsh = htlcScript(secretHash, randomAddress, myAddress);
    console.log(fromBech32(p2wsh.address!).data.toString("hex"));

    // const sendAmount = 3001;

    // const tx = await wallet.send(p2wsh.address!, sendAmount);

    // console.log(tx);
})();
