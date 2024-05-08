import * as bitcoin from "bitcoinjs-lib";
import { fromBase58Check, fromBech32 } from "bitcoinjs-lib/src/address";
import * as crypto from "crypto";
import { htlcScript } from "./htlcScript";

const theirAddress = "bcrt1qcywfsrrmruczxnv0jj9gjx0tjxde3lauvt5am8";
const myAddress = "bcrt1q820mnjaql7s533jcjz6qsuumj8dec9du7lt0dw";

const spk =
    "002096123c2ea50996ef1fcdf0d1d948867b4989c75af678f50cd632ebcc745f7d5a";

const secret = "DITTO-" + 1;
const secretHash = crypto.createHash("sha256").update(secret).digest("hex");

const scriptHex = htlcScript(secretHash, theirAddress, myAddress);

// console.log(crypto.createHash("sha256").update(scriptHex).digest("hex"));
const scriptHash = crypto.createHash("sha256").update(scriptHex).digest("hex");

console.log(spk === `0020${scriptHash}`);
