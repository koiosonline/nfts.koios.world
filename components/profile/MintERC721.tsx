import { useUserSignature } from "@/api/hooks/useUserSignature";
import { MumbaiERC721Config } from "@/data/MumbaiERC721Config";
import { useUserStore } from "@/state/store";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { mutate } from "swr";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import Spinner from "../util/Spinner";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const MintERC721 = () => {
  const user = useUserStore((state) => state.user);
  const { data, isLoading, isError } = useUserSignature(user);
  const addRecentTransaction = useAddRecentTransaction();
  const { width, height } = useWindowSize();

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    isError: isMintError,
    error: mintError,
  } = useContractWrite({
    ...MumbaiERC721Config,
    functionName: "claim",
  });

  const {
    isSuccess: txSuccess,
    error: txError,
    status: txStatus,
    isLoading: txLoading,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  useEffect(() => {
    if (txSuccess) {
      mutate("UserDynamic: " + user);
    }
  }, [txSuccess]);

  useEffect(() => {
    if (txLoading) {
      addRecentTransaction({
        hash: mintData?.hash!,
        description: "Minting Dynamic NFT",
      });
    }
  }, [txStatus, addRecentTransaction, mintData?.hash, txLoading]);

  const mintNFT = async () => {
    if (user && data) {
      mint({ args: [data.salt, data.token] });
    }
  };

  return (
    <>
      {!data && (
        <div className=" absolute bottom-0 h-10 w-full cursor-not-allowed items-center justify-center rounded bg-brand-rose-hot-pink text-center font-heading text-2xl uppercase text-gray-900 transition duration-300 ">
          Not Eligible
        </div>
      )}
      {data && !txSuccess && (
        <button
          onClick={() => mintNFT()}
          className="absolute bottom-0 flex h-20 w-full items-center justify-center rounded bg-brand-rose-hot-pink text-center font-heading text-xl uppercase text-gray-900 transition duration-300 hover:bg-brand-rose-lavender"
        >
          {isMintLoading && !isMintStarted && (
            <>
              <Spinner /> Awaiting approval...
            </>
          )}
          {isMintStarted && (
            <>
              <Spinner /> Minting...
            </>
          )}
          {!isMintLoading && !isMintStarted && "Mint NFT"}
        </button>
      )}
      {txSuccess && (
        <>
          <div className="absolute bottom-0 flex h-20 w-full cursor-not-allowed items-center justify-center rounded bg-brand-rose-hot-pink text-center font-heading text-2xl uppercase text-gray-900 transition duration-300 ">
            Success 🎉
          </div>
          <Confetti width={width} height={height} recycle={false} />
        </>
      )}
    </>
  );
};

export default MintERC721;
