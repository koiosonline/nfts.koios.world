import { useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useNetwork,
  useContractWrite,
} from "wagmi";
import Image from "next/future/image";
import { getSignature } from "@/api/profile/dynamicNFT";
import eContract from "@/data/EvolvingTitan.json";
import ISignatureModel from "@/models/ISignatureModel";
import Spinner from "../util/Spinner";

const DynamicNFTPanel = () => {
  const user = useAccount();
  const { chain } = useNetwork();
  const [signatureProof, setSignatureProof] = useState<ISignatureModel | null>(
    null
  );
  const [loadingMint, setLoadingMint] = useState(false);
  const [minted, setMinted] = useState<boolean | null>(null);
  const [canMint, setCanMint] = useState<boolean>(false);

  const contractRead = useContractRead({
    addressOrName: `${
      chain?.id === 137 ? "" : "0x76355707EE63A1923246490A0E1ecc540EA33654"
    }`,
    contractInterface: eContract.abi,
    functionName: "balanceOf",
    args: `${user.address}`,
  });

  const contractMint = useContractWrite({
    addressOrName: "0x76355707EE63A1923246490A0E1ecc540EA33654",
    contractInterface: eContract.abi,
    functionName: "claim",
    args: [signatureProof?.salt!, signatureProof?.signature!],
  });

  useEffect(() => {
    const fetchMinted = async () => {
      if (user) {
        if (contractRead.data && contractRead.data?.toString() === "0")
          setMinted(false);

        if (contractRead.data?.toString() !== "0") setMinted(true);
      }
    };
    fetchMinted();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const response = await getSignature(user.address!);
        const signatureData = await response.json();
        if (signatureData.data) {
          const signatureModel: ISignatureModel = {
            signature: signatureData.data.token,
            salt: signatureData.data.salt,
          };
          setSignatureProof(signatureModel);
          setCanMint(true);
          return;
        }
      }
    };
    fetchData();
  }, [minted]);

  useEffect(() => {
    if (contractMint.isLoading) setLoadingMint(true);

    if (contractMint.isError) {
      console.log("User declined");
      setLoadingMint(false);
    }
  }, [contractMint.status]);

  const mintNFT = async () => {
    if (user && signatureProof) {
      contractMint.write();
    }
  };

  return (
    <div className="flex h-[70vh] w-full justify-between gap-5 p-10">
      <div className="flex h-full min-h-full w-1/3 flex-col gap-5 rounded bg-gray-900 p-5">
        <h1 className="h-1/6 font-heading text-xl uppercase text-gray-200">
          {minted ? "You have minted a NFT" : "You have not minted a NFT"}
        </h1>
        <div className="relative flex h-5/6 w-full items-center justify-center rounded">
          <Image
            priority
            width={850}
            height={850}
            className="w-full rounded object-contain"
            src="/nfts/unmintedNFT.png"
            alt="Unminted NFT"
          />
          {!minted && !loadingMint && canMint && (
            <div
              onClick={() => mintNFT()}
              className="absolute bottom-0 flex h-20 w-full cursor-pointer items-center justify-center rounded bg-brand-rose-hot-pink text-center font-heading text-2xl uppercase text-gray-900 transition duration-300 hover:bg-brand-rose-lavender"
            >
              Mint NFT
            </div>
          )}
          {loadingMint && (
            <div className="absolute bottom-0 flex h-20 w-full cursor-pointer items-center justify-center rounded bg-brand-rose-hot-pink text-center font-heading text-2xl uppercase text-gray-900 transition duration-300 hover:bg-brand-rose-lavender">
              <Spinner />
              Minting...
            </div>
          )}
          {!canMint && (
            <div className="absolute bottom-0 flex h-20 w-full cursor-not-allowed items-center justify-center rounded bg-brand-rose-hot-pink text-center font-heading text-2xl uppercase text-gray-900 transition duration-300 ">
              Not Eligible
            </div>
          )}
        </div>
      </div>
      <div className="h-full w-2/3 bg-brand-purple-heart"></div>
    </div>
  );
};

export default DynamicNFTPanel;
