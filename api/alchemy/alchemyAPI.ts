import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: process.env.RPC_API_KEY,
  network:
    process.env.NETWORK_ENV === "DEV"
      ? Network.MATIC_MUMBAI
      : Network.MATIC_MAINNET,
};

export const alchemyAPI = new Alchemy(settings);
