import useSWR from "swr";

const fetchUserData = async (address: string) => {
  const res = await fetch(`/api/alchemy/getUserLayerNFTs?address=${address}`);
  return res.json();
};

export function useUserLayers(address: string) {
  const { data, error } = useSWR(
    address ? "UserLayers: " + address : null,
    () => fetchUserData(address),
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
