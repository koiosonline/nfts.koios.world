import { MumbaiERC1155Config } from "@/data/MumbaiERC1155Config";
import { useEffect } from "react";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import Spinner from "../util/Spinner";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useNFTState } from "@/state/store";
import { getUserLayerNFTs } from "@/api/alchemy/getUserLayerNFTs";

const MintERC1155 = ({ proofHash, proofSignature, tokenId }: any) => {
  const account = useAccount();
  const addAndRemove = useNFTState((state) => state.addAndRemove);
  const addNFT = useNFTState((state) => state.addNFT);

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    isError: isMintError,
    error: mintError,
  } = useContractWrite({
    ...MumbaiERC1155Config,
    functionName: "claim",
  });

  const addRecentTransaction = useAddRecentTransaction();

  const {
    isSuccess: txSuccess,
    error: txError,
    status: txStatus,
    isLoading: txLoading,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const mintNFT = async () => {
    mint({ args: [proofHash, proofSignature, tokenId] });
  };

  useEffect(() => {
    if (txLoading) {
      addRecentTransaction({
        hash: mintData?.hash!,
        description: "Minting NFT Layer",
      });
    }
  }, [txStatus]);

  useEffect(() => {
    if (txSuccess) {
      addNFT(tokenId);
    }
  }, [txSuccess]);

  return (
    <>
      {proofHash && proofSignature && !txLoading && !txSuccess && (
        <button
          onClick={() => mintNFT()}
          className="flex h-10 w-1/2 items-center  justify-center rounded bg-brand-rose-hot-pink font-heading uppercase "
        >
          {isMintLoading ? (
            <>
              <Spinner /> Awaiting Approval...
            </>
          ) : (
            "Mint"
          )}
        </button>
      )}

      {txLoading && (
        <div className="flex h-10 w-1/2 items-center justify-center rounded bg-brand-rose-hot-pink font-heading uppercase ">
          <Spinner /> Minting...
        </div>
      )}
      {txSuccess && (
        <div className="flex h-10 w-1/2 items-center justify-center rounded bg-brand-rose-hot-pink font-heading uppercase ">
          Success..🎉
        </div>
      )}
    </>
  );
};
export default MintERC1155;
