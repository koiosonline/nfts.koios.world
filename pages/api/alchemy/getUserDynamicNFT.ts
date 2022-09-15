import type { NextApiRequest, NextApiResponse } from "next";
import { alchemyAPI } from "@/api/alchemy/alchemyAPI";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const address: string = req.query.address?.toString()!;
  const resData = await alchemyAPI.nft.getNftsForOwner(address, {
    contractAddresses: [`${process.env.ERC721_CONTRACT_ADDRESS}`],
  });
  res.status(200).json(resData.ownedNfts);
}
