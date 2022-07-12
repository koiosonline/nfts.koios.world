import ICouponModel from "../models/ICouponModel";

export const uploadSingleCoupon = async (
  couponModel: ICouponModel,
  saltHash: string,
  data: string
) => {
  const res = await fetch(`/api/uploadSingleCoupon`, {
    method: "POST",
    body: JSON.stringify({
      couponModel,
      saltHash,
      data,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("ädadad");
  const uploadRes = await res.json();
  console.log(uploadRes);
  return uploadRes;
};
