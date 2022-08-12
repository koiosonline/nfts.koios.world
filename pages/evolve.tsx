import { getUserDynamicNFT } from "@/api/alchemy/getUserDynamicNFT";
import { getUserLayerNFTs } from "@/api/alchemy/getUserLayerNFTs";
import { getDynamicNFTMetadata } from "@/api/profile/getDynamicNFTMetadata";
import DropdownButton from "@/components/util/DropdownButton";
import DropdownItems from "@/components/util/DropdownItems";
import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useEvolveStore, useNFTState } from "@/state/store";
import Image from "next/future/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Evolve = (items: IERC721MetadataModel[][]) => {
  const user = useAccount();
  const [metadata, setMetadata] = useState<IERC721MetadataModel | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedType, setSelectedType] = useState<number>(0);
  const nftLayers = useNFTState((state) => state.nfts);
  const ownedLayers = useEvolveStore((state) => state.ownedLayers);
  const addClothing = useEvolveStore((state) => state.addClothing);
  const addSkin = useEvolveStore((state) => state.addSkin);
  const addHair = useEvolveStore((state) => state.addHair);
  const addItem = useEvolveStore((state) => state.addItem);
  const addHead = useEvolveStore((state) => state.addHead);

  const titan = useEvolveStore((state) => state.titan);
  const setOwnedLayers = useEvolveStore((state) => state.setOwnedLayers);
  const data = Object.values(items);
  const addAndRemove = useNFTState((state) => state.addAndRemove);
  const [parent] = useAutoAnimate<HTMLDivElement>({
    easing: "ease-in-out",
  });

  const types = [
    {
      name: "Skin",
    },
    {
      name: "Clothing",
    },
    {
      name: "Hair",
    },
    {
      name: "Head",
    },
    {
      name: "Item",
    },
  ];

  const handleItemChange = (index: number) => {
    setSelectedType(index);
    setOpenMenu(false);
  };

  useEffect(() => {
    if (nftLayers && nftLayers.length > 0) {
      setOwnedLayers(data[0].filter((x) => nftLayers.includes(x.tokenId)));
    }
  }, [selectedType]);

  const handleAddition = (layer: IERC721MetadataModel) => {
    if (layer.attributes[0].trait_type === "Clothing")
      addClothing(layer.tokenId);

    if (layer.attributes[0].trait_type === "Skin") addSkin(layer.tokenId);

    if (layer.attributes[0].trait_type === "Head") addHead(layer.tokenId);

    if (layer.attributes[0].trait_type === "Hair") addHair(layer.tokenId);

    if (layer.attributes[0].trait_type === "Item") addItem(layer.tokenId);
  };

  useEffect(() => {
    console.log(titan);
  }, [titan]);

  useEffect(() => {
    const fetchDynamic = async () => {
      if (user.isConnected) {
        const nft = await getUserDynamicNFT(user.address!);
        const metadata = await getDynamicNFTMetadata(nft[0].tokenId);
        const json: IERC721MetadataModel = await metadata.json();

        if (!nftLayers || nftLayers.length === 0) {
          const nfts = await getUserLayerNFTs(user.address!);
          const tokenIds: number[] = nfts.map((nft: any) =>
            parseInt(nft.tokenId)
          );
          addAndRemove(tokenIds);
        }

        setMetadata(json);
      }
    };
    fetchDynamic();
  }, [user.address, user.isConnected]);

  return (
    <div className="flex h-full w-full flex-col justify-between gap-5 pt-20 md:h-[70vh] md:flex-row md:items-center md:justify-center md:p-10">
      <div className="flex h-5/6 w-full flex-col items-center justify-center gap-5 rounded bg-zinc-800 p-5 md:h-full md:min-h-full md:w-1/3">
        <Image
          priority
          width={850}
          height={850}
          className="w-full rounded object-contain"
          src="/nfts/unmintedNFT.png"
          alt="Unminted NFT"
        />
      </div>
      <div className="flex h-5/6 w-full gap-5 rounded bg-zinc-800 p-8 text-gray-200 md:h-full md:w-2/3 ">
        <div className="flex h-full w-1/2 flex-col ">
          <div className="flex h-[15%] flex-col gap-2 p-5">
            <h1 className="font-heading text-3xl uppercase text-zinc-400">
              Change Name
            </h1>
            <input
              className="h-10 w-full rounded border-none bg-zinc-100 pl-5 pr-5 font-heading text-zinc-800"
              defaultValue={metadata?.name ? metadata.name : ""}
              type="text"
            />
          </div>
          <div className="flex h-[45%] flex-col gap-2 p-5">
            <h1 className="font-heading text-3xl uppercase text-zinc-400">
              Change Description
            </h1>
            <textarea
              defaultValue={metadata?.description}
              className="h-full w-full resize-none rounded border-none bg-zinc-100 pl-5 pr-5 font-heading text-zinc-800"
              placeholder={metadata?.description ? metadata.description : ""}
            />
          </div>
          <div className="flex h-[30%] flex-col gap-2 p-5">
            <h1 className="font-heading text-3xl uppercase text-zinc-400">
              Change External URL
            </h1>
            <div className="flex items-center justify-center rounded bg-orange-600/20 p-3 text-center">
              <h2 className="font-heading text-base uppercase text-orange-500">
                Keep it civil 😅
              </h2>
            </div>
            <input
              defaultValue={metadata?.external_url ? metadata.external_url : ""}
              className="h-10 w-full rounded border-none bg-zinc-100 pl-5 pr-5 font-heading text-zinc-800"
              type="text"
            />
          </div>
          <div className="flex h-[10%] flex-col items-center justify-center gap-2 p-5">
            <button className="flex h-10 w-1/2 items-center justify-center rounded bg-brand-rose-hot-pink font-heading uppercase ">
              Evolve
            </button>
          </div>
        </div>
        <div className="flex h-full w-1/2 flex-col items-center">
          <div className="relative h-[20%] w-full items-center justify-center">
            <h1 className="mb-2 font-heading text-3xl text-zinc-400">
              Select Layer Below
            </h1>
            <DropdownButton
              setOpenMenu={setOpenMenu}
              openMenu={openMenu}
              text={types[selectedType].name}
            />
            {openMenu && (
              <DropdownItems
                items={types}
                handleItemChange={handleItemChange}
              />
            )}
          </div>
          <div
            ref={parent}
            className="grid h-[80%] w-full grid-flow-row grid-cols-2 overflow-y-scroll border-2 border-gray-500/20"
          >
            {ownedLayers && (
              <>
                {ownedLayers
                  .filter(
                    (x) =>
                      x.attributes[0].trait_type === types[selectedType].name
                  )
                  .map((item: IERC721MetadataModel, index: number) => (
                    <div
                      onClick={() => handleAddition(item)}
                      className="h-full w-full "
                      key={index}
                    >
                      <img src={item.image} alt={item.name} />
                    </div>
                  ))}
              </>
            )}
          </div>
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
