export const getUserDynamicNFT = async (address: string) => {
  const res = await fetch(`/api/alchemy/getUserDynamicNFT?address=${address}`);
  const uploadRes = await res.json();
  return uploadRes;
};
