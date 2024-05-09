import {
    BitcoinNetwork,
    BitcoinProvider,
    BitcoinWallet,
} from "@catalogfi/wallets";
import { fromBech32 } from "bitcoinjs-lib/src/address";
import { JsonRpcProvider } from "ethers";
import { Wallet } from "ethers";
import { htlcScript } from "./htlcScript";
import * as crypto from "crypto";
import * as bitcoin from "bitcoinjs-lib";
import { hash160, sha256 } from "bitcoinjs-lib/src/crypto";

(async () => {
    const bitcoinNetwork = bitcoin.networks.regtest;

    const mnemonic =
        "annual script valid globe legend innocent vocal wrestle zoo night awesome issue";

    const secret = crypto
        .createHash("sha256")
        .update("DITTO-" + 1)
        .digest("hex");
    const secretHash = crypto
        .createHash("sha256")
        .update(Buffer.from(secret, "hex"))
        .digest("hex");

    // console.log(
    //     sha256(Buffer.from(secret, "hex")) == Buffer.from(secretHash, "hex")
    // );
    // console.log(sha256(Buffer.from(secret, "hex")));
    // console.log(Buffer.from(secretHash, "hex"));
    // return;

    const provider = new BitcoinProvider(
        BitcoinNetwork.Regtest,
        "http://localhost:30000"
    );

    const bitcoinWallet = BitcoinWallet.fromMnemonic(mnemonic, provider);

    const myAddress = await bitcoinWallet.getAddress();

    console.log(
        hash160(Buffer.from(await bitcoinWallet.getPublicKey(), "hex")),
        fromBech32(await bitcoinWallet.getAddress()).data.toString("hex")
    );

    if (!process.env.PRIVATE_KEY) {
        throw new Error("PRIVATE_KEY is not set");
    }

    if (!process.env.RPC_URL) {
        throw new Error("RPC_URL is not set");
    }

    const wallet = new Wallet(
        process.env.PRIVATE_KEY,
        new JsonRpcProvider(process.env.RPC_URL)
    );

    const script = htlcScript(
        secretHash,
        myAddress,
        myAddress,
        await wallet.getAddress()
    );

    const p2wsh = bitcoin.payments.p2wsh({
        redeem: {
            output: script,
        },
        network: bitcoinNetwork,
    });

    const sendAmount = 10000;
    console.log(
        `Sending ${sendAmount} sats to scriptAddress: ${p2wsh.address!}`
    );
    const txid = await bitcoinWallet.send(p2wsh.address!, sendAmount);
    console.log("Broadcasted initiate transaction with txid: ", txid);
    const tx = await provider.getTransaction(txid);

    const txb = new bitcoin.Transaction();
    txb.version = 2;

    txb.addInput(Buffer.from(txid, "hex").reverse(), 0);

    txb.addOutput(
        bitcoin.address.toOutputScript(myAddress, bitcoinNetwork),
        sendAmount - 150
    );

    const txHash = txb.hashForWitnessV0(
        0,
        script,
        tx.vout[0].value,
        bitcoin.Transaction.SIGHASH_ALL
    );
    const sig = await bitcoinWallet.sign(txHash.toString("hex"));

    txb.setWitness(0, [
        // Buffer.from(sig, "hex"),
        bitcoin.script.signature.encode(
            Buffer.from(sig, "hex"),
            bitcoin.Transaction.SIGHASH_ALL
        ),
        Buffer.from(await bitcoinWallet.getPublicKey(), "hex"),
        Buffer.from(secret, "hex"),
        bitcoin.script.number.encode(1),
        script,
    ]);

    console.log(txb);
    console.log(txb.toHex());

    const txid2 = await provider.broadcast(txb.toHex());
    console.log("Broadcasted complete transaction with txid: ", txid2);
})();
