export const getDynamicNFTMetadata = async (tokenId: number) => {
  return fetch(`api/profile/fetchDyanmicNFTMetadata?token=${tokenId}`);
};
