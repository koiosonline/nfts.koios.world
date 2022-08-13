import { getUserDynamicNFT } from "@/api/alchemy/getUserDynamicNFT";
import { getUserLayerNFTs } from "@/api/alchemy/getUserLayerNFTs";
import { getDynamicNFTMetadata } from "@/api/profile/getDynamicNFTMetadata";
import CanvasComposer from "@/components/evolve/CanvasComposer";
import DynamicNFTComposer from "@/components/evolve/DynamicNFTComposer";
import EvolveModal from "@/components/evolve/EvolveModal";

import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useEvolveStore, useModalStore, useNFTState } from "@/state/store";
import { AnimatePresence } from "framer-motion";
import Image from "next/future/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const Evolve = (items: IERC721MetadataModel[][]) => {
  const user = useAccount();
  const [metadata, setMetadata] = useState<IERC721MetadataModel | null>(null);
  const nftLayers = useNFTState((state) => state.nfts);
  const titan = useEvolveStore((state) => state.titan);
  const addAndRemove = useNFTState((state) => state.addAndRemove);
  const openEvolve = useModalStore((state) => state.openEvolve);
  const openEvolveModal = useModalStore((state) => state.openEvolveModal);

  useEffect(() => {
    if (openEvolve) document.body.style.overflow = "hidden";

    if (!openEvolve) document.body.style.overflow = "auto";
  }, [openEvolve]);

  useEffect(() => {
    const fetchDynamic = async () => {
      if (user.isConnected) {
        const nft = await getUserDynamicNFT(user.address!);
        const dynamicNFTMetadata = await getDynamicNFTMetadata(nft[0].tokenId);
        const json: IERC721MetadataModel = await dynamicNFTMetadata.json();

        if (!nftLayers || nftLayers.length === 0) {
          const nfts = await getUserLayerNFTs(user.address!);
          const tokenIds: number[] = nfts.map((item: any) =>
            parseInt(item.tokenId)
          );
          addAndRemove(tokenIds);
        }

        setMetadata(json);
      }
    };
    fetchDynamic();
  }, [user.address, user.isConnected]);

  return (
    <div className="container flex flex-col justify-between gap-5 pt-40 md:items-center md:justify-center ">
      <AnimatePresence>{openEvolve ? <EvolveModal /> : null}</AnimatePresence>
      <div className="flex h-full w-full flex-col items-center justify-center gap-5 pt-20  md:flex-row md:p-10">
        <div className="flex h-full w-1/3 gap-5 rounded bg-zinc-800 p-5">
          {metadata && <CanvasComposer {...metadata} />}
        </div>
        <div className="flex h-full w-full gap-5 rounded bg-zinc-800 p-8 text-gray-200 md:h-full md:w-1/3 ">
          <div className="flex h-full w-full flex-col ">
            <div className="flex h-1/6  flex-col gap-2 p-5">
              <h1 className="font-heading text-xl uppercase text-zinc-400">
                Change Name
              </h1>
              <input
                className="h-10 w-full rounded border-none bg-zinc-100 pl-5 pr-5 font-heading text-zinc-800"
                defaultValue={metadata?.name ? metadata.name : ""}
                type="text"
              />
            </div>
            <div className="flex h-3/6  flex-col gap-2 p-5">
              <h1 className="font-heading text-xl uppercase text-zinc-400">
                Change Description
              </h1>
              <textarea
                defaultValue={metadata?.description}
                className="h-full w-full resize-none rounded border-none bg-zinc-100 pl-5 pr-5 font-heading text-zinc-800"
                placeholder={metadata?.description ? metadata.description : ""}
              />
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
                defaultValue={
                  metadata?.external_url ? metadata.external_url : ""
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
      <div className="mx-auto mb-10 flex h-full w-full items-center justify-center rounded ">
        <div className="flex h-full w-2/3 flex-col items-center rounded bg-zinc-800 p-10">
          <DynamicNFTComposer {...items} />
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

export default Evolve;
