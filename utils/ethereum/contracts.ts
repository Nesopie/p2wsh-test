import { JsonRpcProvider } from "ethers";
import { Wallet } from "ethers";
import { Minter__factory, Verifier__factory } from "../../typechain";

export const getProvider = () => {
    if (!process.env.RPC_URL) throw new Error("RPC_URL is not set");

    return new JsonRpcProvider(process.env.RPC_URL);
};

export const getWallet = () => {
    if (!process.env.MINTER_PRIVATE_KEY)
        throw new Error("MINTER_PRIVATE_KEY is not set");

    if (!process.env.RPC_URL) throw new Error("RPC_URL is not set");

    const wallet = new Wallet(process.env.MINTER_PRIVATE_KEY, getProvider());

    return wallet;
};

export const getMinterContract = () => {
    if (!process.env.MINTER_CONTRACT)
        throw new Error("MINTER_CONTRACT is not set");

    if (!process.env.RPC_URL) throw new Error("RPC_URL is not set");

    const wallet = getWallet();

    const minter = Minter__factory.connect(process.env.MINTER_CONTRACT, wallet);

    return minter;
};

export const getVerifierContract = () => {
    const provider = getProvider();

    if (!process.env.VERIFIER_CONTRACT)
        throw new Error("VERIFIER_CONTRACT is not set");

    const verifier = Verifier__factory.connect(
        process.env.VERIFIER_CONTRACT,
        provider
    );

    return verifier;
};
