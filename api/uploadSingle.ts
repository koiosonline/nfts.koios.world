import IAchievementModel from "../models/IAchievementModel";

export const uploadSingle = async (
  achievementWhitelist: IAchievementModel,
  saltHash: String,
  data: String
) => {
  const res = await fetch(`/api/uploadSingle`, {
    method: "POST",
    body: JSON.stringify({
      achievementWhitelist,
      saltHash,
      data,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  const uploadRes = await res.json();
  if (uploadRes.success) {
    return uploadRes;
  } else {
    return uploadRes;
  }
};
