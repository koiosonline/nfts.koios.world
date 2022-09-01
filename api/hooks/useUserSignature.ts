import useSWR from "swr";

const fetchUserSignature = async (address: string) => {
  const resCoup = await fetch(`/api/profile/dynamicNFT?address=${address}`);
  return resCoup.json();
};

export function useUserSignature(address: string) {
  const { data, error } = useSWR(
    address ? "UserSignature: " + address : null,
    () => fetchUserSignature(address)
  );

  return {
    isLoading: !error && !data,
    data: data?.data,
    isError: error,
  };
}
