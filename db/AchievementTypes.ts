import { Schema, model, models } from "mongoose";
import IAchievementType from "../models/IAchievementType";

const achievementTypeSchema = new Schema<IAchievementType>({
  name: { type: String, required: true },
  type: { type: Number, required: true },
  tokenId: { type: Number, required: true },
});

const AchievementTypes =
  models.AchievementTypes ||
  model("AchievementTypes", achievementTypeSchema, "AchievementTypes");

export default AchievementTypes;
