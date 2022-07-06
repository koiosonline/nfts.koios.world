import { Schema, model, models } from "mongoose";
import IWhitelistedAddress from "../models/IWhitelistedAddress";

const whitelistSchema = new Schema<IWhitelistedAddress>({
  address: { type: String, required: true },
  name: { type: String, required: true },
});

const Whitelist = models.Whitelist || model("Whitelist", whitelistSchema);

export default Whitelist;
