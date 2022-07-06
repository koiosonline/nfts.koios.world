import type { NextApiRequest, NextApiResponse } from "next";
import { connectMongo } from "../../db/connectMongo";
import Whitelist from "../../db/Whitelist";

type Data = {
  found: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectMongo();

  const address = await Whitelist.findOne({
    address: req.query.address,
  });

  if (address) {
    res.status(200).json({ found: true });
    return;
  }
  res.status(200).json({ found: false });
}
