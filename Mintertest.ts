import { MTLC__factory } from "./typechain/factories/MTLC__factory";
import { MTLC } from "./typechain/MTLC";
import { Contract, JsonRpcProvider, sha256 } from "ethers";
import AtomicSwapABI from "./abi/MTLC.json";
import MinterABI from "./abi/minter.json";
import { Atomicswap__factory } from "./typechain";
import { getWallet } from "./utils/ethereum/contracts";
import * as crypto from "crypto";
import { AbiCoder } from "ethers";

async function main() {
  const secret = crypto
    .createHash("sha256")
    .update("DITTO-" + 1)
    .digest("hex");

  const secretHash = crypto.createHash("sha256").update(secret).digest("hex");

  const provider = new JsonRpcProvider(process.env.RPC_URL);
  const Minter = new Contract(
    process.env.MINTER_CONTRACT!,
    MinterABI,
    provider
  );

  const wallet = getWallet();
  const MTLCswapAddr = await Minter.mtlc();
  const testTokenAddr = await Minter.token();

  const AtomicSwap = MTLC__factory.connect(MTLCswapAddr, wallet);
  const userArr = wallet.address;

  const res = await AtomicSwap.MTLCOrders("0x" + secretHash);
  console.log(res);
  // await AtomicSwap.mint("0x" + secret);

  // await AtomicSwap.mint(orderId, "0x" + secret);

  // bytes32 OrderId = sha256(abi.encode(_secretHash, msg.sender));

  //  console.log(await AtomicSwap.)
}

main().then((e) => {});

// login => metamask
//
