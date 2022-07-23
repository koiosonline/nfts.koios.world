import { parse } from "papaparse";
import IWhitelistModel from "@/models/IWhitelistModel";

export const uploadMultipleAddresses = async (
  whitelistModels: IWhitelistModel[],
  saltHash: string,
  data: string
) => {
  const res = await fetch(`/api/whitelist/uploadMultiple`, {
    method: "POST",
    body: JSON.stringify({
      whitelistModels,
      saltHash,
      data,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  const uploadRes = await res.json();
  console.log({ uploadRes });
  return uploadRes;
};

export const addressesFromFile = async (
  file: File
): Promise<IWhitelistModel[]> => {
  const text = await file.text();
  const fileData = parse(text, {
    header: true,
  });
  let addressesWhitelist: IWhitelistModel[] = [];
  for (const element of fileData.data) {
    const preModel: any = element;
    if (preModel["What is your *Ethereum Public Key*?"]) {
      const whitelistModel: IWhitelistModel = {
        address: preModel["What is your *Ethereum Public Key*?"],
      };
      addressesWhitelist.push(whitelistModel);
    }
  }
  return addressesWhitelist;
};
