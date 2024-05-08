import * as bitcoin from "bitcoinjs-lib";
import { fromBase58Check, fromBech32 } from "bitcoinjs-lib/src/address";

export const htlcScript = (
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

    const script = bitcoin.script.compile([
        bitcoin.script.OPS.OP_IF,
        bitcoin.script.OPS.OP_SHA256,
        Buffer.from(secretHash, "hex"),
        bitcoin.script.OPS.OP_EQUALVERIFY,
        bitcoin.script.OPS.OP_DUP,
        bitcoin.script.OPS.OP_HASH160,
        Buffer.from(getFormattedAddress(theirAddress), "hex"),
        bitcoin.script.OPS.OP_ELSE,
        bitcoin.script.number.encode(2),
        bitcoin.script.OPS.OP_CHECKSEQUENCEVERIFY,
        bitcoin.script.OPS.OP_DROP,
        bitcoin.script.OPS.OP_DUP,
        bitcoin.script.OPS.OP_HASH160,
        Buffer.from(getFormattedAddress(myAddress), "hex"),
        bitcoin.script.OPS.OP_ENDIF,
        bitcoin.script.OPS.OP_EQUALVERIFY,
        bitcoin.script.OPS.OP_CHECKSIG,
    ]);

    return script;
};
