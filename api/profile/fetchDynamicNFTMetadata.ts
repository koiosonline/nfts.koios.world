export const getDynamicNFTMetadata = async (tokenId: number) => {
  return fetch(`api/profile/fetchDynamicNFTMetadata?token=${tokenId}`);
};
