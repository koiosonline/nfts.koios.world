import IBadgeRegisterModel from "@/models/IBadgeRegisterModel";
import IUserClaimModel from "@/models/IUserClaimModel";
import useSWR from "swr";

const fetchUserBadgeClaims = async (address: string) => {
  const resUserClaims = await fetch(
    `/api/badges/getUserBadgeClaims?address=${address}`
  );
  return resUserClaims.json();
};

export function useUserBadgeClaims(address: string) {
  const { data, error } = useSWR(
    address ? "UserBadgeClaims: " + address : null,
    () => fetchUserBadgeClaims(address)
  );

  return {
    isLoading: !error && !data,
    data: data?.data as IUserClaimModel[],
    isError: error,
  };
}
