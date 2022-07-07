import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../db/connectMongo";
import AchievementTypes from "../../db/AchievementTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();
  const types = await AchievementTypes.find();

  if (types) {
    res.status(200).json(types);
    return;
  }
  res.status(500).json({ success: false });
}
