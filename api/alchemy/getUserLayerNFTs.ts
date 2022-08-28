export const getUserLayerNFTs = async (address: string) => {
  const res = await fetch(`/api/alchemy/getUserLayerNFTs?address=${address}`);
  return res.json();
};
