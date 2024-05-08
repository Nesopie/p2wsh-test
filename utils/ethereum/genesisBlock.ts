import { getVerifierContract } from "./contracts";

//gets the "genesis" from the verifier contract
export const getGenesisBlock = () => {
    const verifier = getVerifierContract();

    const genesis = verifier.
};
