import eContract from "@/data/EvolvingTitan.json";
export const ERC721Config = {
  addressOrName: process.env.ERC721_CONTRACT_ADDRESS!,
  contractInterface: eContract.abi,
};
