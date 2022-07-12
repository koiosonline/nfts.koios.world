import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import IAchievementModel from "../../models/IAchievementModel";
import { IResponseMessage } from "../../models/IResponseMessage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseMessage>
) {
  if (req.method === "POST") {
    const achievementData = req.body
      .achievementWhitelist as IAchievementModel[];
    const signature = req.body.data;
    const message = req.body.saltHash;
    const address = ethers.utils.verifyMessage(message, signature);

    const resData = await fetch(
      `${process.env.API_URL}/api/achievement/findAddress/${address}`
    );
    const resJson = await resData.json();
    if (resJson.success) {
      try {
        const resUpload = await fetch(
          `${process.env.API_URL}/api/achievement/uploadMultiple`,
          {
            method: "POST",
            body: JSON.stringify(achievementData),
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
    } else {
      res
        .status(401)
        .json({
          success: false,
          error: true,
          message: "Unauthorized for upload!",
        });
      return;
    }
  }

  res
    .status(405)
    .json({ success: false, error: true, message: "Method not allowed!" });
  return;
}
