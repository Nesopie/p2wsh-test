import { BitcoinNetwork, BitcoinProvider } from "@catalogfi/wallets";
import axios from "axios";
import { BlockHeaderStruct } from "../../typechain/Minter";

export const submissionDetails = async (
    txid: string,
    genesisBlockHash: string
) => {
    const provider = new BitcoinProvider(
        BitcoinNetwork.Regtest,
        "http://localhost:30000"
    );

    const { data: genesisBlock } = await axios.get(
        `http://localhost:30000/block/${genesisBlockHash}`
    );
    const genesisBlockHeight = genesisBlock.height;

    const tx = await provider.getTransaction(txid);
    const blockHeight = tx.status.block_height!;

    const calibratedBlockIndex = blockHeight - genesisBlockHeight;
    const epochStart =
        genesisBlockHeight + Math.floor(calibratedBlockIndex / 72) * 72;

    let blocks = [] as BlockHeaderStruct[];

    let end = epochStart + 72;
    const start = epochStart;

    while (end >= start) {
        const blockResponse = await axios.get(
            "http://localhost:3000/blocks/" + end
        );

        blocks.push(
            ...blockResponse.data.map((block: any) => {
                const version = Buffer.alloc(4);
                version.writeInt32LE(block.version, 0);

                const timestamp = Buffer.alloc(4);
                timestamp.writeUInt32LE(block.timestamp, 0);

                const nBits = Buffer.alloc(4);
                nBits.writeUint32LE(block.bits, 0);

                const nonce = Buffer.alloc(4);
                nonce.writeUInt32LE(block.nonce, 0);

                return {
                    version: "0x" + version.toString("hex"),
                    timestamp: "0x" + timestamp.toString("hex"),
                    nBits: "0x" + nBits.toString("hex"),
                    nonce: "0x" + nonce.toString("hex"),
                    previousBlockHash:
                        "0x" +
                        Buffer.from(block.previousblockhash, "hex")
                            .reverse()
                            .toString("hex"),
                    merkleRootHash:
                        "0x" +
                        Buffer.from(block.merkle_root, "hex")
                            .reverse()
                            .toString("hex"),
                    height: block.height,
                };
            })
        );
        end -= blockResponse.data.length;
    }

    const blockSequence = blocks.reverse().slice(-73);

    const blockIndex = blockHeight - epochStart;

    const { data } = await axios.get(
        `http://localhost:30000/tx/${txid}/merkle-proof`
    );

    const proof = data.merkle.map(
        (leaf: string) =>
            "0x" + Buffer.from(leaf, "hex").reverse().toString("hex")
    );
    const txIndex = data.pos;

    return {
        blockSequence,
        blockIndex,
        txIndex,
        proof,
    };
};
