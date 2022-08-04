import type { NextApiRequest, NextApiResponse } from "next";
import { getNftsForOwner } from "@alch/alchemy-sdk";
import { alchemyAPI } from "@/api/alchemy/alchemyAPI";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const address: string = req.query.address?.toString()!;
  const resData = await getNftsForOwner(alchemyAPI(), address, {
    contractAddresses: [`${process.env.ERC1155_CONTRACT_ADDRESS}`],
  });
  res.status(200).json(resData.ownedNfts);
}
