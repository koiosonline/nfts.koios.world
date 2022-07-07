import type { NextApiRequest, NextApiResponse } from "next";
import Achievement from "../../db/Achievements";
import { connectMongo } from "../../db/connectMongo";
import IAchievementModel from "../../models/IAchievementModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IAchievementModel[]>
) {
  if (req.method === "POST") {
    await connectMongo();
    const data = req.body as IAchievementModel[];
    try {
      for (let item of data) {
        const achievementForUser = await Achievement.findOne({
          address: item.address,
          type: item.type,
          name: item.name,
          tokenId: item.tokenId,
        });
        if (!achievementForUser) {
          await Achievement.create(item);
          console.log("Created achievement for user");
        }
      }
      res.status(200).json(data);
      return;
    } catch (e) {
      console.log(e);
      res.status(500).json(data);
      return;
    }
  }

  res.status(405);
  return;
}
