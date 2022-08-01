import type { NextApiRequest, NextApiResponse } from "next";
import { IResponseMessage } from "@/models/IResponseMessage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseMessage>
) {
  const resData = await fetch(
    `${process.env.API_URL}/api/dynamicNFT/signature/${req.query.address}`
  );
  const resJson: IResponseMessage = await resData.json();
  res.status(200).json(resJson);
}
