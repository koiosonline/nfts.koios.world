import { parse } from "papaparse";
import ICouponModel from "@/models/ICouponModel";

export const uploadMultipleCoupons = async (
  couponModels: ICouponModel[],
  saltHash: string,
  data: string
) => {
  const res = await fetch(`/api/coupon/uploadMultipleCoupons`, {
    method: "POST",
    body: JSON.stringify({
      couponModels,
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

export const couponsFromFile = async (file: File): Promise<ICouponModel[]> => {
  const text = await file.text();
  const fileData = parse(text, {
    header: true,
  });
  let couponsWhitelist: ICouponModel[] = [];
  for (const element of fileData.data) {
    const preModel: any = element;
    if (preModel["Public Key"]) {
      const couponModel = await checkCouponEligibility(preModel);
      if (couponModel) {
        couponsWhitelist.push(couponModel);
      }
    }
  }
  return couponsWhitelist;
};

const checkCouponEligibility = async (
  element: any
): Promise<ICouponModel | null> => {
  if (element["Exam Grade"] >= 5.5 && element["Deadline"] == "x") {
    return {
      address: element["Public Key"],
      amount: 2,
    };
  }
  if (element["Exam Grade"] >= 5.5 || element["Deadline"] == "x") {
    return {
      address: element["Public Key"],
      amount: 1,
    };
  }
  return null;
};
