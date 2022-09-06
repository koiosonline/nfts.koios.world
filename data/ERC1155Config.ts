import eContract from "@/data/TitanLayers.json";
export const ERC1155Config = {
  addressOrName: process.env.ERC1155_CONTRACT_ADDRESS!,
  contractInterface: eContract.abi,
};
