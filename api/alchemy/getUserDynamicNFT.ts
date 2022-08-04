import { getNftsForOwner } from "@alch/alchemy-sdk";
import { alchemyAPI } from "@/api/alchemy/alchemyAPI";

// export const getUserDynamicNFT = async (address: string) => {
//   return getNftsForOwner(alchemyAPI(), address, {
//     contractAddresses: [`${process.env.ERC721_CONTRACT_ADDRESS}`],
//     omitMetadata: true,
//   });
// };

export const getUserDynamicNFT = async (address: string) => {
  const res = await fetch(`/api/alchemy/getUserDynamicNFT?address=${address}`);
  const uploadRes = await res.json();
  return uploadRes;
};
