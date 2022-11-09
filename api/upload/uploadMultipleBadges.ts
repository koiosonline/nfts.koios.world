import { parse } from "papaparse";
import IBadgeRegisterModel from "@/models/IBadgeRegisterModel";

export const uploadMultipleBadges = async (
  badgeModels: IBadgeRegisterModel[],
  saltHash: string,
  data: string
) => {
  const res = await fetch(`/api/badges/uploadMultipleBadges`, {
    method: "POST",
    body: JSON.stringify({
      badgeModels,
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

export const addressesFromFileForBadges = async (
  file: File,
  type: number
): Promise<IBadgeRegisterModel[]> => {
  const text = await file.text();
  const fileData = parse(text, {
    header: true,
  });
  let addressesWhitelist: IBadgeRegisterModel[] = [];
  for (const element of fileData.data) {
    const preModel: any = element;
    if (preModel.address) {
      const whitelistModel: IBadgeRegisterModel = {
        address: preModel.address,
        type: type + 1,
      };
      addressesWhitelist.push(whitelistModel);
    }
  }
  return addressesWhitelist;
};
