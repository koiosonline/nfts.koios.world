export const getUserLayerNFTs = async (address: string) => {
  const res = await fetch(`/api/alchemy/getUserLayerNFTs?address=${address}`);
  const uploadRes = await res.json();
  return uploadRes;
};
