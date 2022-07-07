import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import Achievement from "../../db/Achievements";
import { connectMongo } from "../../db/connectMongo";
import Whitelist from "../../db/Whitelist";
import IAchievementModel from "../../models/IAchievementModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectMongo();
    const achievementData = req.body
      .achievementWhitelist as IAchievementModel[];
    const signature = req.body.data;
    const message = req.body.saltHash;
    const address = ethers.utils.verifyMessage(message, signature);
    const isWhitelisted = await Whitelist.findOne({
      address: address,
    });
    if (isWhitelisted) {
      try {
        for (let item of achievementData) {
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
        res.status(200).json({ success: true });
        return;
      } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, error: e });
        return;
      }
    } else {
      res.status(401);
      return;
    }
  }

  res.status(405);
  return;
}
