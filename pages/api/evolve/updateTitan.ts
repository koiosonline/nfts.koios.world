import type { NextApiRequest, NextApiResponse } from "next";
import { IResponseMessage } from "@/models/IResponseMessage";
import IEvolveModel from "@/models/IEvolveModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseMessage>
) {
  if (req.method === "POST") {
    const model: IEvolveModel = req.body;
    try {
      const resUpload = await fetch(
        `${process.env.API_URL}/api/dynamicNFT/evolve`,
        {
          method: "POST",
          body: JSON.stringify(model),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log(resUpload);
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

      if (resUpload.status === 500) {
        const resJson: IResponseMessage = await resUpload.json();
        res.status(500).json(resJson);
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
