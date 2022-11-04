import type { NextApiRequest, NextApiResponse } from "next";
import { IResponseMessage } from "@/models/IResponseMessage";
import { alchemyAPI } from "@/api/alchemy/alchemyAPI";
import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { NftMetadata } from "alchemy-sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseMessage>
) {
  try {
    const resData = await alchemyAPI.nft.getNftsForContract(
      `0xC4C6B26967B4aDCc4Ba181171C14E2372656d207`
    );

    const metadata: NftMetadata[] = [];
    for (let token of resData.nfts) {
      if (token.rawMetadata) {
        metadata.push(token.rawMetadata);
      }
    }

    const resJson: IResponseMessage = {
      success: true,
      message: "Badges found",
      data: metadata,
    };

    return res.status(200).json(resJson);
  } catch (e) {
    return res.status(200).json({
      success: true,
      message: "No tokens found",
      data: [],
    });
  }
}
