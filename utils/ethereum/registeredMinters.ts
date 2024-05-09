import { JsonRpcProvider } from "ethers";
import { Minter__factory } from "../../typechain";

export const registeredMinters = async () => {
  console.log("Fetching registered addresses");
  if (!process.env.RPC_URL) throw new Error("RPC_URL is not set");
  const provider = new JsonRpcProvider(process.env.RPC_URL);

  if (!process.env.MINTER_CONTRACT)
    throw new Error("MINTER_CONTRACT is not set");

  const contract = Minter__factory.connect(
    process.env.MINTER_CONTRACT,
    provider
  );

  const registeredAddresses = await contract.getWhiteListedAddresses();

  return registeredAddresses;
};
