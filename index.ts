import {
    BitcoinNetwork,
    BitcoinProvider,
    BitcoinWallet,
} from "@catalogfi/wallets";
import * as crypto from "crypto";
import { getBitcoinNetwork, getWalletSigner } from "./getWalletSigner";
import { registeredMinters } from "./utils/ethereum/registeredMinters";
import { registerMinter } from "./utils/ethereum/registerMinter";
import { fromBech32, toBech32 } from "bitcoinjs-lib/src/address";
import { hash160 } from "bitcoinjs-lib/src/crypto";
import { strip0x } from "./utils/utils";
import { htlcScript } from "./htlcScript";
import * as bitcoin from "bitcoinjs-lib";
import { mine } from "./utils/bitcoin/mine";
import { Wallet } from "ethers";
import { JsonRpcApiProvider } from "ethers";
import { JsonRpcProvider } from "ethers";
import { Minter__factory } from "./typechain";
import { submissionDetails } from "./utils/bitcoin/submissionDetails";

const FEE = 2000;
const randomAddress = "bcrt1qcywfsrrmruczxnv0jj9gjx0tjxde3lauvt5am8";
const network = BitcoinNetwork.Regtest;
const bitcoinNetwork = getBitcoinNetwork(network);

const secret = crypto
    .createHash("sha256")
    .update("DITTO-" + 1)
    .digest("hex");
const secretHash = crypto.createHash("sha256").update(secret).digest("hex");

const mnemonic =
    "annual script valid globe legend innocent vocal wrestle zoo night awesome issue";
const provider = new BitcoinProvider(
    BitcoinNetwork.Regtest,
    "http://localhost:30000"
);

const walletStore = new Map<string, string>();

const bitcoinWallet = BitcoinWallet.fromMnemonic(mnemonic, provider);
// const signer = getWalletSigner(mnemonic, network, 0);

(async () => {
    console.log("address", await bitcoinWallet.getAddress());
    console.log(
        "formateed address",
        fromBech32(await bitcoinWallet.getAddress()).data.toString("hex")
    );
    console.log("pubkey", await bitcoinWallet.getPublicKey());
    console.log(
        "hash160(pubkey)",
        hash160(Buffer.from(await bitcoinWallet.getPublicKey(), "hex"))
    );
    console.log(
        toBech32(
            Buffer.from("3a9fb9cba0ffa148c65890b408739b91db9c15bc", "hex"),
            0,
            "bcrt"
        )
    );

    return;

    await registerMinter();

    const registeredMintersList = await registeredMinters();
    console.log("Registered Minters List: ", registeredMintersList);
    if (!registeredMintersList.length) {
        console.log("No minters have been registered");
        return;
    }
    const minter = strip0x(registeredMintersList[0]);

    const minterAddress = toBech32(
        Buffer.from(minter, "hex"),
        0,
        bitcoinNetwork.bech32
    );

    // console.log(minterAddress);
    const myAddress = await bitcoinWallet.getAddress();
    const myP2pkhAddress = fromBech32(myAddress).data.toString("hex");

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
        minterAddress,
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

    console.log("mining 72 blocks......");
    await mine(72, minterAddress);

    const tx = await provider.getTransactionHex(txid);
    console.log("tx: ", tx);

    if (!process.env.MINTER_CONTRACT) {
        throw new Error("MINTER_CONTRACT is not set");
    }

    const contract = Minter__factory.connect(
        process.env.MINTER_CONTRACT,
        wallet
    );

    if (!process.env.GENESIS_BLOCK_HASH)
        throw new Error("GENESIS_BLOCK_HASH is not set");

    const { blockSequence, blockIndex, proof, txIndex } =
        await submissionDetails(txid, process.env.GENESIS_BLOCK_HASH);

    console.log(blockSequence[0]);

    await new Promise((resolve) => setTimeout(resolve, 10000));

    const txHash = await contract.registerTx(
        blockSequence,
        blockIndex,
        txIndex,
        "0x" + tx,
        proof,
        "0x" + secretHash,
        "0x" + minter,
        "0x" + myP2pkhAddress,
        await wallet.getAddress()
    );

    console.log(txHash.hash);
    // console.log(txid);
})();
