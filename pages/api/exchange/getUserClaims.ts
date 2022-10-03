import type { NextApiRequest, NextApiResponse } from "next";
import { IResponseMessage } from "@/models/IResponseMessage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseMessage>
) {
  try {
    const resData = await fetch(
      `${process.env.API_URL}/api/layer/userClaims/${req.query.address}`
    );

    const resJson: IResponseMessage = await resData.json();
    return res.status(200).json(resJson);
  } catch (e) {
    return res.status(200).json({
      success: true,
      message: "An error occurred",
      data: [],
    });
  }
}
