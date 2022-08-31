import type { NextApiRequest, NextApiResponse } from "next";
import IERC721MetadataModel from "@/models/IERC721MetadataModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IERC721MetadataModel>
) {
  const resData = await fetch(
    `${process.env.API_URL}/api/metadata/erc721/${req.query.token}.json`
  );
  const resJson: IERC721MetadataModel = await resData.json();
  res.status(200).json(resJson);
}
