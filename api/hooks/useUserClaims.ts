import IUserClaimModel from "@/models/IUserClaimModel";
import useSWR from "swr";

const fetchUserClaims = async (address: string) => {
  const resUserClaims = await fetch(
    `/api/exchange/getUserClaims?address=${address}`
  );
  return resUserClaims.json();
};

export function useUserClaims(address: string) {
  const { data, error } = useSWR(
    address ? "UserClaims: " + address : null,
    () => fetchUserClaims(address)
  );

  return {
    isLoading: !error && !data,
    data: data?.data as IUserClaimModel[],
    isError: error,
  };
}
