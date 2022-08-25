import FilterPanel from "@/components/exchange/FilterPanel";
import PurchaseModel from "@/components/exchange/PurchaseModal";
import ShopPanel from "@/components/exchange/ShopPanel";
import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useFilterStore, useModalStore, useNFTState } from "@/state/store";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { getUserLayerNFTs } from "@/api/alchemy/getUserLayerNFTs";
import { AnimatePresence } from "framer-motion";
import { IoFilter } from "react-icons/io5";
import MobileFilterModal from "@/components/exchange/MobileFilterModal";

const Exchange = ({ items }: any) => {
  const account = useAccount();
  const filters = useFilterStore((state) => state.filters);
  const open = useModalStore((state) => state.open);
  const modalItem = useModalStore((state) => state.item);
  const addAndRemove = useNFTState((state) => state.addAndRemove);
  const [userAddress, setUserAddress] = useState("");
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const openFilter = useModalStore((state) => state.openFilter);
  const toggleFilterModal = useModalStore((state) => state.toggleFilterModal);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";

    if (!open) document.body.style.overflow = "auto";
  }, [open]);

  useEffect(() => {
    setUserAddress(account?.address!);
  }, [account]);

  useEffect(() => {
    const fetchNfts = async () => {
      const nfts = await getUserLayerNFTs(userAddress);
      const tokenIds: number[] = nfts.map((nft: any) => parseInt(nft.tokenId));
      addAndRemove(tokenIds);
    };
    if (userAddress) {
      fetchNfts();
    }
  }, [userAddress, addAndRemove]);

  if (!userAddress) {
    return (
      <div
        className={
          "flex h-full w-full items-center justify-center bg-default-text text-center font-heading text-8xl text-brand-rose-hot-pink"
        }
      >
        Please Login
      </div>
    );
  }

  return (
    <div className="container relative mx-auto flex flex-col items-center justify-center gap-5 pt-20">
      <AnimatePresence>
        {open && modalItem ? <PurchaseModel {...modalItem} /> : null}
      </AnimatePresence>
      <AnimatePresence>
        {openFilter ? <MobileFilterModal {...items} /> : null}
      </AnimatePresence>
      <div className="container mx-auto flex h-[80vh] flex-col md:flex-row">
        <div className="container flex  w-full flex-row rounded bg-zinc-900 md:h-full md:w-[25%] md:flex-col">
          <div className="container flex h-[10vh] items-center justify-between border-r-2 border-b-2 border-zinc-800 border-opacity-40 bg-zinc-900 p-5 md:justify-center md:p-0">
            <h1 className="bg-gradient-to-r from-brand-rose-hot-pink to-brand-purple-heart bg-clip-text text-left font-heading text-4xl text-transparent">
              Exchange
            </h1>
            <div
              onClick={() => toggleFilterModal()}
              className="block text-zinc-400 transition duration-300 hover:text-white md:hidden"
            >
              <IoFilter size={25} />
            </div>
          </div>

          <div className="hidden md:block">
            <FilterPanel {...items} />
          </div>
        </div>
        <div className="container flex h-full w-full flex-col md:w-[75%]">
          <div
            ref={parent}
            className="container hidden h-[10vh] items-center gap-5 bg-zinc-900 p-10 md:flex "
          >
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

    revalidate: 30,
  };
}

export default Exchange;
