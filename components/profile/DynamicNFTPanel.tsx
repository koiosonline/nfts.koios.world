import { useEffect, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { getSignature } from "@/api/profile/dynamicNFT";
import Spinner from "../util/Spinner";
import { MumbaiERC721Config } from "@/data/MumbaiERC721Config";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useUserStore } from "@/state/store";
import { useUserDynamicNFT } from "@/api/hooks/useUserDynamicNFT";
import { mutate } from "swr";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const DynamicNFTPanel = () => {
  const user = useUserStore((state) => state.user);
  const [canMint, setCanMint] = useState<boolean>(false);
  const { width, height } = useWindowSize();

  const addRecentTransaction = useAddRecentTransaction();

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

  const isMinted = txSuccess;
  const { data, isLoading, isError } = useUserDynamicNFT(user);

  useEffect(() => {
    const fetchMinted = async () => {
      const response = await getSignature(user);
      const signatureData = await response.json();

      if (signatureData.data) {
        setCanMint(true);
      } else {
        setCanMint(false);
      }
    };
    fetchMinted();
  }, [user, txSuccess]);

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
    if (user && canMint) {
      const response = await getSignature(user);
      const signatureData = await response.json();
      mint({ args: [signatureData.data.salt, signatureData.data.token] });
    }
  };

  return (
    <div className="flex h-full w-full flex-col justify-between gap-5 pt-20 md:h-[70vh] md:flex-row md:items-center md:p-10">
      {txSuccess && <Confetti width={width} height={height} recycle={false} />}
      <div className="flex h-5/6 w-full flex-col gap-5 rounded bg-zinc-800 p-5 md:h-full md:min-h-full md:w-1/3">
        {data && data.name ? (
          <h1 className="h-1/6 font-heading text-2xl uppercase text-gray-200">
            {data.name}
          </h1>
        ) : (
          <h1 className="h-1/6 font-heading text-2xl uppercase text-gray-200">
            You have not minted a NFT
          </h1>
        )}
        {canMint && !data && (
          <h1 className="h-1/6 font-heading text-lg uppercase text-gray-400">
            You can mint a NFT!
          </h1>
        )}

        <div className="relative flex h-5/6 w-full items-center justify-center rounded">
          {data && data.image ? (
            <img
              width={850}
              height={850}
              className="w-full rounded object-contain text-xl"
              src={data.image}
              alt="Metadata Image"
            />
          ) : (
            <img
              width={850}
              height={850}
              className=" w-full rounded object-contain"
              src="/nfts/unmintedNFT.png"
              alt="Unminted NFT"
            />
          )}

          {!canMint && (
            <div className=" absolute bottom-0 h-10 w-full cursor-not-allowed items-center justify-center rounded bg-brand-rose-hot-pink text-center font-heading text-2xl uppercase text-gray-900 transition duration-300 ">
              Not Eligible
            </div>
          )}

          {!data?.tokenId && canMint && !txSuccess && (
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
            <div className="absolute bottom-0 flex h-20 w-full cursor-not-allowed items-center justify-center rounded bg-brand-rose-hot-pink text-center font-heading text-2xl uppercase text-gray-900 transition duration-300 ">
              Success 🎉
            </div>
          )}
        </div>
      </div>
      <div className="flex h-5/6 w-full flex-col gap-5 rounded bg-zinc-800 p-8 text-gray-200 md:h-full md:w-2/3 ">
        {data ? (
          <>
            <div className="flex h-[10%] w-full text-left">
              <h1 className="font-heading text-2xl uppercase md:text-4xl">
                {data.name ? data.name : "Read below on how to obtain one!"}
              </h1>
            </div>
            <div className="flex max-h-[200px] w-full flex-col justify-between overflow-y-scroll text-left text-sm md:h-[30%] md:text-base lg:text-lg">
              <p className="font-base italic text-gray-200/50">
                {data.description
                  ? data.description
                  : "To become eligible either follow the minor or be active in the community so a teacher whitelists you"}
              </p>
            </div>
            {data?.attributes && (
              <div className="flex h-[60%] w-full flex-col gap-2">
                <div className="h-1/6 w-full text-left">
                  <h1 className="font-heading text-xl uppercase ">
                    Attributes
                  </h1>
                </div>
                <div className="grid h-5/6 w-full grid-flow-row grid-cols-2 gap-2 md:grid-flow-row md:grid-rows-3 lg:grid-cols-3 xl:grid-cols-4">
                  {data.attributes.map((attribute, index) => (
                    <div
                      className="flex h-full w-full flex-col items-center justify-evenly rounded border-[1px] border-brand-rose-hot-pink bg-brand-rose-hot-pink/10 p-3 "
                      key={index}
                    >
                      <h1 className="font-heading text-sm uppercase text-brand-rose-hot-pink md:text-lg">
                        {attribute.trait_type}
                      </h1>
                      <h1 className="font-base text-sm md:text-base">
                        {attribute.value}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex h-[10%] w-full text-left">
            <h1 className="font-heading text-2xl uppercase md:text-4xl">
              To be eligible you have to be whitelisted by a tutor
            </h1>
          </div>
        )}
      </div>
      <div className="h-[10vh]"></div>
    </div>
  );
};

export default DynamicNFTPanel;
