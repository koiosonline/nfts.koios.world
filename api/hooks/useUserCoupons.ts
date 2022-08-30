import useSWR from "swr";

const fetchUserData = async (address: string) => {
  const resCoup = await fetch(`/api/coupon/getCoupons?address=${address}`);
  return resCoup.json();
};

export function useUserCoupons(address: string) {
  const { data, error } = useSWR(
    address ? "UserCoupons: " + address : null,
    () => fetchUserData(address),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    isLoading: !error && !data,
    data: data?.data,
    isError: error,
  };
}
