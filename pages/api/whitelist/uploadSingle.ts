import type { NextApiRequest, NextApiResponse } from "next";
import { IResponseMessage } from "@/models/IResponseMessage";
import IWhitelistModel from "@/models/IWhitelistModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseMessage>
) {
  if (req.method === "POST") {
    const whitelistData = req.body.data as IWhitelistModel;
    const signature = req.body.signature;
    const message = req.body.saltHash;
    try {
      const resUpload = await fetch(
        `${process.env.API_URL}/api/whitelist/uploadSingle`,
        {
          method: "POST",
          body: JSON.stringify({
            data: whitelistData,
            saltHash: message,
            signature: signature,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (resUpload.status === 200) {
        const resJson: IResponseMessage = await resUpload.json();
        res.status(200).json(resJson);
        return;
      }
      if (resUpload.status === 401) {
        const resJson: IResponseMessage = await resUpload.json();
        res.status(401).json(resJson);
        return;
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        error: true,
        message: "500: Internal Server Error",
      });
      return;
    }
  } else {
    res
      .status(405)
      .json({ success: false, error: true, message: "Method not allowed!" });
    return;
  }
}
