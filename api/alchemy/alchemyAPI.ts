import { Network, initializeAlchemy } from "@alch/alchemy-sdk";

export const alchemyAPI = () => {
  const settings = {
    apiKey: process.env.RPC_API_KEY,
    network: Network.MATIC_MUMBAI,
  };

  return initializeAlchemy(settings);
};
