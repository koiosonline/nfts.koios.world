import IUploadModel from "@/models/IUploadModel";

export const uploadSingleAddress = async (uploadModel: IUploadModel) => {
  const res = await fetch(`/api/profile/uploadSingle`, {
    method: "POST",
    body: JSON.stringify(uploadModel),
    headers: {
      "content-type": "application/json",
    },
  });
  const uploadRes = await res.json();
  return uploadRes;
};
