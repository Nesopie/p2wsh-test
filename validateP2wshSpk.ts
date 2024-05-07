import * as bitcoin from "bitcoinjs-lib";
import { fromBase58Check, fromBech32 } from "bitcoinjs-lib/src/address";
import * as crypto from "crypto";

const theirAddress = "bcrt1qcywfsrrmruczxnv0jj9gjx0tjxde3lauvt5am8";
const myAddress = "bcrt1q820mnjaql7s533jcjz6qsuumj8dec9du7lt0dw";

const spk =
    "002096123c2ea50996ef1fcdf0d1d948867b4989c75af678f50cd632ebcc745f7d5a";

const htlcScript = (
    secretHash: string,
    theirPubkey: string,
    myPubkey: string
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
        bitcoin.script.OPS.OP_IF,
        bitcoin.script.OPS.OP_SHA256,
        Buffer.from(secretHash, "hex"),
        bitcoin.script.OPS.OP_EQUALVERIFY,
        bitcoin.script.OPS.OP_DUP,
        Buffer.from(theirAddress, "hex"),
        bitcoin.script.OPS.OP_ELSE,
        bitcoin.script.number.encode(2),
        bitcoin.script.OPS.OP_CHECKSEQUENCEVERIFY,
        bitcoin.script.OPS.OP_DROP,
        bitcoin.script.OPS.OP_DUP,
        bitcoin.script.OPS.OP_HASH160,
        Buffer.from(myAddress, "hex"),
        bitcoin.script.OPS.OP_ENDIF,
        bitcoin.script.OPS.OP_EQUALVERIFY,
        bitcoin.script.OPS.OP_CHECKSIG,
    ]);

    return script;
};

const secret = "DITTO-" + 1;
const secretHash = crypto.createHash("sha256").update(secret).digest("hex");

const scriptHex = htlcScript(secretHash, theirAddress, myAddress);

// console.log(crypto.createHash("sha256").update(scriptHex).digest("hex"));
const scriptHash = crypto.createHash("sha256").update(scriptHex).digest("hex");

console.log(spk === `0020${scriptHash}`);
