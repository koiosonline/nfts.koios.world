import { useEffect, useMemo, useState } from "react";
import { useAccount, useContractRead, chain, useNetwork } from "wagmi";
import Image from "next/future/image";
import { fetchDynamicNFTData } from "@/api/profile/dynamicNFT";
import eContract from "@/data/EvolvingTitan.json";

const DynamicNFTPanel = () => {
  const user = useAccount();
  const { chain } = useNetwork();
  const [nft, setNft] = useState([]);
  const [minted, setMinted] = useState<boolean | null>(null);
  const { data } = useContractRead({
    addressOrName: `${
      chain?.id === 137 ? "" : "0x76355707EE63A1923246490A0E1ecc540EA33654"
    }`,
    contractInterface: eContract.abi,
    functionName: "balanceOf",
    args: `${user.address}`,
  });

  useEffect(() => {
    const fetchWhitelisted = async () => {
      if (user) {
        console.log(data);
        if (data && data?.toString() === "0") setMinted(false);

        if (data?.toString() !== "0") setMinted(true);

        //const response = await fetchDynamicNFTData(user.address!);
        // if (response.status === 200) {
        //   const data = await response.json();

        // }
      }
    };
    fetchWhitelisted();
  }, [user]);

  return (
    <div className="flex h-[70vh] w-full justify-between gap-5 p-10">
      <div className="flex h-full min-h-full w-1/3 flex-col gap-5 rounded bg-gray-900 p-5">
        <h1 className="h-1/6 font-heading text-xl uppercase text-gray-200">
          {minted ? "You have minted a NFT" : "You have not minted a NFT"}
        </h1>
        <div className="relative flex h-5/6 w-full rounded">
          <Image
            priority
            width={750}
            height={750}
            className="w-full rounded object-contain"
            src="/nfts/unmintedNFT.png"
            alt="Unminted NFT"
          />
          {!minted && (
            <div className="absolute bottom-0 flex h-20 w-full cursor-pointer items-center justify-center rounded bg-brand-rose-hot-pink text-center font-heading text-2xl uppercase text-gray-900 transition duration-300 hover:bg-brand-rose-lavender">
              Mint NFT
            </div>
          )}
        </div>
      </div>
      <div className="h-full w-2/3 bg-brand-purple-heart"></div>
    </div>
  );
};

export default DynamicNFTPanel;
