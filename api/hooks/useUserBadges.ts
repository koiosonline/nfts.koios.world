import useSWR from "swr";

const fetchUserBadges = async (address: string) => {
  const res = await fetch(`/api/alchemy/getUserBadges?address=${address}`);
  return res.json();
};

export function useUserBadges(address: string) {
  const { data, error } = useSWR(
    address ? "UserBadges: " + address : null,
    () => fetchUserBadges(address),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    isLoading: !error && !data,
    data: data ? data.map((nft: any) => parseInt(nft.tokenId)) : [],
    isError: error,
  };
}
