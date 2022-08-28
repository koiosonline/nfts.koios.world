export const fetchCoupons = async (address: string) => {
  const res = await fetch(`/api/coupon/getCoupons?address=${address}`);
  return res.json();
};
