import { Wallet } from "ethers";
import { Minter__factory } from "../../typechain";
import { fromBech32 } from "bitcoinjs-lib/src/address";
import { JsonRpcProvider } from "ethers";

export const registerMinter = async () => {
    if (!process.env.MINTER_PRIVATE_KEY)
        throw new Error("MINTER_PRIVATE_KEY is not set");

    if (!process.env.MINTER_CONTRACT)
        throw new Error("MINTER_CONTRACT is not set");

    if (!process.env.RPC_URL) throw new Error("RPC_URL is not set");

    const wallet = new Wallet(
        process.env.MINTER_PRIVATE_KEY,
        new JsonRpcProvider(process.env.RPC_URL)
    );

    const minter = Minter__factory.connect(process.env.MINTER_CONTRACT, wallet);

    if (!process.env.MINTER_BTC_ADDRESS)
        throw new Error("MINTER_BTC_PUBKEY is not set");

    const minterP2pkhAddress = fromBech32(
        process.env.MINTER_BTC_ADDRESS
    ).data.toString("hex");

    console.log("Registering minter address: ", minterP2pkhAddress);
    await minter.register("0x" + minterP2pkhAddress);
    console.log("Minter address registered");
};
