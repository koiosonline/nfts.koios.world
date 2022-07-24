import type { NextApiRequest, NextApiResponse } from "next";
import { IResponseMessage } from "@/models/IResponseMessage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseMessage>
) {
  const resData = await fetch(
    `${process.env.API_URL}/api/achievement/getAllAchievements`
  );
  const resJson: IResponseMessage = await resData.json();
  if (resJson.success) {
    res.status(200).json(resJson);
    return;
  }
  res.status(500).json(resJson);
}
