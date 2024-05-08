import axios from "axios";

export const mine = async (blocks: number, rewardAddress: string) => {
    const jsonRpcBody = {
        jsonrpc: "1.0",
        id: "mine",
        method: "generatetoaddress",
        params: [blocks, rewardAddress],
    };

    const response = await axios.post(
        "http://admin1:123@127.0.0.1:18443/",
        jsonRpcBody
    );

    await new Promise((resolve) => setTimeout(resolve, 10000));

    return response.data;
};
