import FilterPanel from "@/components/exchange/FilterPanel";
import PurchaseModel from "@/components/exchange/PurchaseModal";
import ShopPanel from "@/components/exchange/ShopPanel";
import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useFilterStore, useModalStore, useNFTState } from "@/state/store";
import { useAccount } from "wagmi";
import { Network, initializeAlchemy, getNftsForOwner } from "@alch/alchemy-sdk";
import { useEffect, useState } from "react";

const Exchange = ({ items }: any) => {
  const account = useAccount();
  const filters = useFilterStore((state) => state.filters);
  const open = useModalStore((state) => state.open);
  const modalItem = useModalStore((state) => state.item);
  const addAndRemove = useNFTState((state) => state.addAndRemove);

  // Optional Config object, but defaults to demo api-key and eth-mainnet.
  const settings = {
    apiKey: process.env.RPC_API_KEY, // Replace with your Alchemy API Key.
    network: Network.MATIC_MUMBAI, // Replace with your network.
  };

  const alchemy = initializeAlchemy(settings);

  useEffect(() => {
    const fetchNfts = async () => {
      const nfts = await getNftsForOwner(alchemy, account?.address!, {
        contractAddresses: ["0x5F94055977e06f4D424FA3b349144cAd924A7399"],
      });

      const tokenIds: number[] = nfts.ownedNfts.map((nft: any) =>
        parseInt(nft.tokenId)
      );
      addAndRemove(tokenIds);
    };
    fetchNfts();
  }, [account.address]);

  if (!account.isConnected) {
    <div
      className={
        "flex h-screen w-full items-center justify-center bg-default-text text-center font-heading text-8xl text-brand-rose-hot-pink"
      }
    >
      Not Allowed
    </div>;
  }

  return (
    <div className="container relative mx-auto flex flex-col items-center justify-center gap-5">
      {open && modalItem ? <PurchaseModel {...modalItem} /> : null}
      {/* <div className="container -m-20 mx-auto mb-10 flex h-20 items-center justify-center rounded bg-gray-900 px-10">
        <h1 className="bg-gradient-to-r from-brand-rose-hot-pink to-brand-purple-heart bg-clip-text text-center font-heading text-4xl text-transparent">
          Welcome to da shop
        </h1>
      </div> */}
      <div className="container mx-auto flex h-[80vh]">
        <div className="container flex h-full w-[25%] flex-col rounded bg-zinc-900">
          <div className="container flex h-[10vh] items-center justify-center  border-r-2 border-b-2 border-zinc-800 border-opacity-40 bg-zinc-900">
            <h1 className="bg-gradient-to-r from-brand-rose-hot-pink to-brand-purple-heart bg-clip-text text-center font-heading text-4xl text-transparent">
              Exchange
            </h1>
          </div>
          <FilterPanel {...items} />
        </div>
        <div className="container flex w-[75%] flex-col">
          <div className="container flex h-[10vh] items-center gap-5 bg-zinc-900 p-10">
            {filters.map((item: any, index: number) => (
              <div
                key={index}
                className="h-6 w-20 rounded bg-zinc-800 p-1 text-center font-base text-xs font-semibold uppercase text-pink-500"
              >
                {item}
              </div>
            ))}
          </div>
          <ShopPanel {...items} />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_URL}/api/metadata/erc1155`);

  const items: IERC721MetadataModel[] = await res.json();

  return {
    props: {
      items,
    },
  };
}

export default Exchange;
