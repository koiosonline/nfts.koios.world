import IUploadModel from "@/models/IUploadModel";

export const uploadSingleCoupon = async (uploadModel: IUploadModel) => {
  const res = await fetch(`/api/uploadSingleCoupon`, {
    method: "POST",
    body: JSON.stringify(uploadModel),
    headers: {
      "content-type": "application/json",
    },
  });
  const uploadRes = await res.json();
  return uploadRes;
};
