import { Network, initializeAlchemy } from "@alch/alchemy-sdk";

export const alchemyAPI = () => {
  console.log(process.env.NETWORK_ENV);
  const settings = {
    apiKey: process.env.RPC_API_KEY,
    network:
      process.env.NETWORK_ENV === "DEV"
        ? Network.MATIC_MUMBAI
        : Network.MATIC_MAINNET,
  };

  return initializeAlchemy(settings);
};
