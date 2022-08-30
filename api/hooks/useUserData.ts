import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import useSWR from "swr";

const fetchUserData = async (address: string) => {
  const res = await fetch(`/api/alchemy/getUserLayerNFTs?address=${address}`);
  const resCoup = await fetch(`/api/coupon/getCoupons?address=${address}`);
  const resDyn = await fetch(
    `/api/alchemy/getUserDynamicNFT?address=${address}`
  );
  const data = await resDyn.json();
  if (data[0]) {
    const metadataRes = await fetch(
      `api/profile/fetchDyanmicNFTMetadata?token=${data[0].tokenId}`
    );
    const metadata: IERC721MetadataModel = await metadataRes.json();
    return {
      dynamicNFT: metadata,
      layers: await res.json(),
      coupons: await resCoup.json(),
    };
  } else {
    return {
      dynamicNFT: null,
      layers: await res.json(),
      coupons: await resCoup.json(),
    };
  }
};

export function useUserData(address: string) {
  const { data, error } = useSWR(address ? address : null, fetchUserData, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    isLoading: !error && !data,
    dynamicNFT: data ? data.dynamicNFT : null,
    tokenIds: data?.layers
      ? data.layers.map((nft: any) => parseInt(nft.tokenId))
      : [],
    coupons: data?.coupons,
    isError: error,
  };
}
