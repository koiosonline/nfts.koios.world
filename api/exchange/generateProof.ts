export const generateProof = async (
  signature: string,
  saltHash: string,
  tokenId: number
) => {
  const res = await fetch(`/api/exchange/generateProof`, {
    method: "POST",
    body: JSON.stringify({
      saltHash,
      signature,
      tokenId,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  const uploadRes = await res.json();
  return uploadRes;
};
