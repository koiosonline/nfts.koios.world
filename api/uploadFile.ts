import { parse } from "papaparse";
import IAchievementModel from "../models/IAchievementModel";

export const uploadFile = async (
  achievementWhitelist: IAchievementModel[],
  saltHash: String,
  data: String
) => {
  const res = await fetch(`/api/uploadFile`, {
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

export const whitelistFromFile = async (
  file: File,
  achievementTypes: any,
  selectedAchievement: number
) => {
  const text = await file.text();
  const fileData = parse(text, {
    header: true,
  });
  let achievementWhitelist: IAchievementModel[] = [];
  for (const element of fileData.data) {
    const preModel: any = element;
    if (preModel["What is your *Ethereum Public Key*?"]) {
      const modelletje: IAchievementModel = {
        address: preModel["What is your *Ethereum Public Key*?"],
        type: achievementTypes[selectedAchievement].type,
        dateAchieved: Date.now(),
        name: achievementTypes[selectedAchievement].name,
        tokenId: achievementTypes[selectedAchievement].tokenId,
      };
      achievementWhitelist.push(modelletje);
    }
  }
  return achievementWhitelist;
};
