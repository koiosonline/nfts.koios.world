import IUploadModel from "@/models/IUploadModel";

export const uploadSingleBadge = async (uploadModel: IUploadModel) => {
  const res = await fetch(`/api/badges/uploadSingleBadge`, {
    method: "POST",
    body: JSON.stringify(uploadModel),
    headers: {
      "content-type": "application/json",
    },
  });
  const uploadRes = await res.json();
  return uploadRes;
};
