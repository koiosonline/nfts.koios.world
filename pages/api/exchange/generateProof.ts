import type { NextApiRequest, NextApiResponse } from "next";
import { IResponseMessage } from "@/models/IResponseMessage";
import ILayerClaimModel from "@/models/ILayerClaimModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseMessage>
) {
  if (req.method === "POST") {
    const uploadData: ILayerClaimModel = req.body;
    try {
      const resUpload = await fetch(
        `${process.env.API_URL}/api/layer/signature`,
        {
          method: "POST",
          body: JSON.stringify(uploadData),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const uploadRes: IResponseMessage = await resUpload.json();
      res.status(200).json(uploadRes);
      return;
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        error: true,
        message: "500: Internal Server Error",
      });
      return;
    }
  }
  res
    .status(405)
    .json({ success: false, error: true, message: "Method not allowed!" });
  return;
}
