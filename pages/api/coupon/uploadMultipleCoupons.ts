import type { NextApiRequest, NextApiResponse } from "next";
import ICouponModel from "@/models/ICouponModel";
import { IResponseMessage } from "@/models/IResponseMessage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseMessage>
) {
  if (req.method === "POST") {
    const couponData = req.body.couponModels as ICouponModel[];
    const signature = req.body.data;
    const message = req.body.saltHash;
    try {
      const resUpload = await fetch(
        `${process.env.API_URL}/api/coupon/uploadMultiple`,
        {
          method: "POST",
          body: JSON.stringify({
            data: couponData,
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
