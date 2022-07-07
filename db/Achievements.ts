import { Schema, model, models } from "mongoose";
import IAchievementModel from "../models/IAchievementModel";

const achievementSchema = new Schema<IAchievementModel>({
  address: { type: String, required: true },
  dateAchieved: { type: Number, required: true },
  type: { type: Number, required: true },
  name: { type: String, required: true },
  tokenId: { type: Number, required: true },
});

const Achievement =
  models.Achievement || model("Achievement", achievementSchema);

export default Achievement;
