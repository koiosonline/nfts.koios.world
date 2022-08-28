import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import useSWR from "swr";

const fetcher = async (address: string) => {
  const res = await fetch(`/api/alchemy/getUserLayerNFTs?address=${address}`);
  return res.json();
};

export function useUserLayerNFTs(address: string) {
  const { data, isValidating, error } = useSWR<IERC721MetadataModel[]>(
    address ? address : null,
    fetcher
  );

  if (data) {
    const tokenIds: number[] = data.map((nft: any) => parseInt(nft.tokenId));

    return { data, tokenIds, isLoading: isValidating, isError: error };
  }
  return { data, isLoading: isValidating, isError: error };
}
