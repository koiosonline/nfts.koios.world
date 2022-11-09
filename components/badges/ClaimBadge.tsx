import { ERC1155Config } from "@/data/ERC1155Config";
import { useEffect } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import Spinner from "../util/Spinner";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useUserStore } from "@/state/store";
import { useSWRConfig } from "swr";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useUserClaims } from "@/api/hooks/useUserClaims";

const ClaimBadge = ({ tokenId }: any) => {
  const user = useUserStore((state) => state.user);
  const { data, isError, isLoading } = useUserClaims(user);
  const { mutate } = useSWRConfig();
  const { width, height } = useWindowSize();

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    isError: isMintError,
    error: mintError,
  } = useContractWrite({
    ...ERC1155Config,
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
    mint({
      args: [
        data.filter((x) => x.tokenId === tokenId)[0].salt,
        data.filter((x) => x.tokenId === tokenId)[0].proof,
        tokenId,
      ],
    });
  };

  useEffect(() => {
    console.log(txStatus);
    if (txLoading) {
      addRecentTransaction({
        hash: mintData?.hash!,
        description: "Minting NFT Layer",
      });
    }
  }, [txStatus]);

  useEffect(() => {
    if (txSuccess) {
      mutate("UserClaims: " + user);
      mutate("UserLayers: " + user);
    }
  }, [txSuccess]);

  return (
    <>
      {txSuccess && <Confetti width={width} height={height} recycle={false} />}
      {data && !txLoading && !txSuccess && (
        <button
          onClick={() => mintNFT()}
          className="flex h-12 w-1/3 items-center justify-center  rounded bg-brand-rose-hot-pink p-2 font-heading uppercase transition duration-300 hover:bg-brand-purple-300 "
        >
          {isMintLoading ? (
            <>
              <Spinner /> Awaiting Approval...
            </>
          ) : (
            "Claim"
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
export default ClaimBadge;
