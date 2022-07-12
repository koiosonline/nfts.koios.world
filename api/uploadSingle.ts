import IAchievementModel from "../models/IAchievementModel";
import IAchievementType from "../models/IAchievementType";

export const uploadSingle = async (
  achievementWhitelist: IAchievementType,
  addressData: String,
  saltHash: String,
  data: String
) => {
  const achievementItem: IAchievementModel = {
    address: addressData,
    type: achievementWhitelist.type,
    dateAchieved: Date.now(),
    name: achievementWhitelist.name,
    tokenId: achievementWhitelist.tokenId,
  };
  const res = await fetch(`/api/uploadSingle`, {
    method: "POST",
    body: JSON.stringify({
      achievementItem,
      saltHash,
      data,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  const uploadRes = await res.json();
  return uploadRes;
};
