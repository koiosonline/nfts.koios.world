import { useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import Image from "next/future/image";
import { getSignature } from "@/api/profile/dynamicNFT";
import Spinner from "../util/Spinner";
import { MumbaiERC721Config } from "@/data/MumbaiERC721Config";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { getUserDynamicNFT } from "@/api/alchemy/getUserDynamicNFT";

const DynamicNFTPanel = () => {
  const user = useAccount();
  const [minted, setMinted] = useState<boolean | null>(null);
  const [canMint, setCanMint] = useState<boolean>(false);
  const [metadata, setMetadata] = useState<IERC721MetadataModel | null>(null);

  const addRecentTransaction = useAddRecentTransaction();

  const contractRead = useContractRead({
    ...MumbaiERC721Config,
    functionName: "balanceOf",
    args: `${user.address}`,
  });

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

  useEffect(() => {
    const fetchMinted = async () => {
      if (user.isConnected) {
        if (contractRead.data && contractRead.data.toString() === "0")
          setMinted(false);

        if (contractRead.data?.toString() !== "0") {
          setMinted(true);
          const nfts = await getUserDynamicNFT(user.address!);
          const data: IERC721MetadataModel = nfts[0].rawMetadata;

          setMetadata(data);
        } else {
          setMetadata(null);
        }

        const response = await getSignature(user.address!);
        const signatureData = await response.json();

        if (signatureData.data) {
          setCanMint(true);
        } else {
          setCanMint(false);
        }
      }
    };
    fetchMinted();
  }, [user.address, txSuccess]);

  useEffect(() => {
    if (txLoading) {
      addRecentTransaction({
        hash: mintData?.hash!,
        description: "Minting Dynamic NFT",
      });
    }
  }, [txStatus]);

  const mintNFT = async () => {
    if (user.isConnected && canMint) {
      const response = await getSignature(user.address!);
      const signatureData = await response.json();
      mint({ args: [signatureData.data.salt, signatureData.data.token] });
    }
  };

  return (
    <div className="flex h-[70vh] w-full justify-between gap-5 p-10">
      <div className="flex h-full min-h-full w-1/3 flex-col gap-5 rounded bg-zinc-800 p-5">
        <h1 className="h-1/6 font-heading text-xl uppercase text-gray-200">
          {minted ? "You have minted a NFT" : "You have not minted a NFT"}
        </h1>
        <div className="relative flex h-5/6 w-full items-center justify-center rounded">
          {!minted && !metadata ? (
            <Image
              priority
              width={850}
              height={850}
              className="w-full rounded object-contain"
              src="/nfts/unmintedNFT.png"
              alt="Unminted NFT"
            />
          ) : (
            <img
              width={850}
              height={850}
              className="w-full rounded object-contain"
              src={metadata?.image!}
              alt="Unminted NFT"
            />
          )}

          {!minted && canMint && !isMinted && (
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
              {!isMintLoading && isMintStarted && !canMint && "Not Eligible"}
            </button>
          )}
          {!canMint && (
            <div className="absolute bottom-0 flex h-20 w-full cursor-not-allowed items-center justify-center rounded bg-brand-rose-hot-pink text-center font-heading text-2xl uppercase text-gray-900 transition duration-300 ">
              Not Eligible
            </div>
          )}
        </div>
      </div>
      <div className="h-full w-2/3 rounded bg-zinc-800"></div>
    </div>
  );
};

export default DynamicNFTPanel;
