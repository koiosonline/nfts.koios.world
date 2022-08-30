import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import useSWR from "swr";

const fetchUserData = async (address: string) => {
  const resDyn = await fetch(
    `/api/alchemy/getUserDynamicNFT?address=${address}`
  );
  const data = await resDyn.json();
  if (data[0]) {
    const metadataRes = await fetch(
      `api/profile/fetchDynamicNFTMetadata?token=${data[0].tokenId}`
    );
    return metadataRes.json();
  }

  return null;
};

export function useUserDynamicNFT(address: string) {
  const { data, error } = useSWR<IERC721MetadataModel>(
    address ? "UserDynamicNFT: " + address : null,
    () => fetchUserData(address),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    isLoading: !error && !data,
    data,
    isError: error,
  };
}
