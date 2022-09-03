import CanvasComposer from "@/components/evolve/CanvasComposer";
import DynamicNFTComposer from "@/components/evolve/DynamicNFTComposer";
import EvolveModal from "@/components/evolve/EvolveModal";

import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useEvolveStore, useModalStore, useUserStore } from "@/state/store";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { ImEnlarge2 } from "react-icons/im";
import DescModal from "@/components/evolve/DescModal";
import Spinner from "@/components/util/Spinner";
import { useUserLayers } from "@/api/hooks/useUserLayers";
import { useUserDynamicNFT } from "@/api/hooks/useUserDynamicNFT";

const Evolve = (items: IERC721MetadataModel[][]) => {
  const user = useUserStore((state) => state.user);
  const openEvolve = useModalStore((state) => state.openEvolve);
  const openDesc = useModalStore((state) => state.openDesc);
  const toggleDescModal = useModalStore((state) => state.toggleDescModal);
  const openEvolveModal = useModalStore((state) => state.openEvolveModal);
  const setName = useEvolveStore((state) => state.setName);
  const setDescription = useEvolveStore((state) => state.setDescription);
  const setExternalURL = useEvolveStore((state) => state.setExternalURL);
  const nftDescription = useEvolveStore((state) => state.nftDescription);

  useEffect(() => {
    if (openEvolve) document.body.style.overflow = "hidden";

    if (!openEvolve) document.body.style.overflow = "auto";
  }, [openEvolve]);

  const { data, isError, isLoading } = useUserLayers(user);
  const {
    data: dynamicNFT,
    isLoading: isDynamicNFTLoading,
    isError: isDynamicNFTError,
  } = useUserDynamicNFT(user);

  useEffect(() => {
    if (dynamicNFT) {
      setName(dynamicNFT.name);
      setExternalURL(dynamicNFT.external_url);
      setDescription(dynamicNFT.description);
    }
  }, [dynamicNFT]);

  if (!user) {
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

  if (isLoading || isDynamicNFTLoading) {
    return (
      <div
        className={
          "flex h-full w-full items-center justify-center bg-default-text text-center font-heading text-5xl text-brand-rose-hot-pink"
        }
      >
        <Spinner />
        Loading data...
      </div>
    );
  }

  if (!dynamicNFT?.tokenId) {
    return (
      <div
        className={
          "flex h-full w-full items-center justify-center bg-default-text text-center font-heading text-5xl text-brand-rose-hot-pink"
        }
      >
        You do not own a dynamic NFT yet.
      </div>
    );
  }

  return (
    <>
      {data && (
        <div className="container flex flex-col justify-between gap-5 p-5 md:items-center md:justify-center ">
          <AnimatePresence>
            {openEvolve && data ? <EvolveModal item={dynamicNFT} /> : null}
          </AnimatePresence>
          <AnimatePresence>{openDesc ? <DescModal /> : null}</AnimatePresence>
          <div className="flex  w-full flex-col items-center justify-center gap-5 md:flex-row ">
            <div className="flex h-full max-h-[500px] min-h-[500px] w-full items-center justify-center gap-5 rounded  bg-zinc-800 p-5 md:w-1/3">
              {data && <CanvasComposer {...dynamicNFT} />}
            </div>
            <div className="flex  h-full w-full gap-5 rounded bg-zinc-800 text-gray-200 md:h-full md:w-1/3 ">
              <div className="flex h-full w-full flex-col ">
                <div className="flex h-1/6  flex-col gap-2 p-5">
                  <h1 className="font-heading text-xl uppercase text-zinc-400">
                    Change Name
                  </h1>
                  <input
                    maxLength={100}
                    onChange={(e) => setName(e.target.value)}
                    className="h-10 w-full rounded border-none bg-zinc-100 pl-5 pr-5 font-heading text-zinc-800"
                    defaultValue={dynamicNFT?.name ? dynamicNFT.name : ""}
                    type="text"
                  />
                </div>
                <div className="relative flex h-3/6 flex-col gap-2 p-5 text-left">
                  <div className="flex w-full  justify-between ">
                    <h1 className=" font-heading text-xl uppercase text-zinc-400">
                      Change Description
                    </h1>
                    <div
                      onClick={() => toggleDescModal()}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-zinc-400 transition duration-300 ease-in-out hover:scale-110"
                    >
                      <ImEnlarge2 size={20} className=" text-black " />
                    </div>
                  </div>

                  <div className="relative">
                    <textarea
                      maxLength={2000}
                      onChange={(e) => setDescription(e.target.value)}
                      defaultValue={nftDescription}
                      className=" h-full w-full resize-none rounded border-none bg-zinc-100 pl-5 pr-5 font-heading text-zinc-800"
                      placeholder={
                        dynamicNFT?.description ? dynamicNFT.description : ""
                      }
                    />
                  </div>
                </div>
                <div className="flex h-1/6 flex-col gap-2 p-5">
                  <h1 className="font-heading text-xl uppercase text-zinc-400">
                    Change External URL
                  </h1>
                  <div className="flex items-center justify-center rounded bg-orange-600/20 p-3 text-center">
                    <h2 className="font-heading text-base uppercase text-orange-500">
                      Keep it civil 😅
                    </h2>
                  </div>
                  <input
                    maxLength={100}
                    onChange={(e) => setExternalURL(e.target.value)}
                    defaultValue={
                      dynamicNFT?.external_url ? dynamicNFT.external_url : ""
                    }
                    className="h-10 w-full rounded border-none bg-zinc-100 pl-5 pr-5 font-heading text-zinc-800"
                    type="text"
                  />
                </div>
                <div className="flex h-1/6 flex-col items-center justify-center gap-2 p-5">
                  <button
                    onClick={() => openEvolveModal()}
                    className="flex h-10 w-1/2 items-center justify-center rounded bg-brand-rose-hot-pink font-heading uppercase "
                  >
                    Evolve
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-full w-full items-center justify-center rounded ">
            <div className="flex h-full w-full flex-col items-center rounded bg-zinc-800 p-5 md:w-2/3">
              <DynamicNFTComposer {...items} />
            </div>
          </div>
        </div>
      )}
    </>
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

export default Evolve;
