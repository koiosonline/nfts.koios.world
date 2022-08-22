import DropdownButton from "../util/DropdownButton";
import DropdownItems from "../util/DropdownItems";
import { useEffect, useState } from "react";
import { useEvolveStore, useNFTState } from "@/state/store";
import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import SelectedCheckmark from "./SelectedCheckMark";

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

const DynamicNFTComposer = (items: IERC721MetadataModel[][]) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<number>(0);
  const ownedLayers = useEvolveStore((state) => state.ownedLayers);
  const nftLayers = useNFTState((state) => state.nfts);
  const setOwnedLayers = useEvolveStore((state) => state.setOwnedLayers);
  const deleteLayer = useEvolveStore((state) => state.deleteLayer);
  const data = Object.values(items);
  const titan = useEvolveStore((state) => state.titan);
  const [parent] = useAutoAnimate<HTMLDivElement>({
    easing: "ease-in-out",
  });

  const handleAddition = (layer: IERC721MetadataModel) => {
    if (titan.get(layer.attributes[0].trait_type) === layer.tokenId) {
      deleteLayer();
      titan.set(layer.attributes[0].trait_type, 0);
      console.log(titan);
    } else {
      useEvolveStore.setState((state) => ({
        titan: new Map(state.titan).set(
          layer.attributes[0].trait_type,
          layer.tokenId
        ),
      }));
    }
  };

  const handleItemChange = (index: number) => {
    setSelectedType(index);
    setOpenMenu(false);
  };

  useEffect(() => {
    if (nftLayers && nftLayers.length > 0) {
      setOwnedLayers(data[0].filter((x) => nftLayers.includes(x.tokenId)));
    }
  }, [selectedType, nftLayers]);

  return (
    <>
      <div className="relative h-[20%] w-full items-center justify-center">
        <h1 className="mb-2 font-heading text-3xl text-zinc-400">
          Select Layers Below
        </h1>
        <DropdownButton
          setOpenMenu={setOpenMenu}
          openMenu={openMenu}
          text={types[selectedType].name}
        />
        {openMenu && (
          <DropdownItems items={types} handleItemChange={handleItemChange} />
        )}
      </div>
      <div
        ref={parent}
        className="mt-10 grid h-[80%] w-full grid-flow-row grid-cols-2 gap-5 overflow-y-scroll rounded border-2 border-gray-500/20 p-5 md:grid-cols-3 lg:grid-cols-4"
      >
        <>
          {ownedLayers
            .filter(
              (x) => x.attributes[0].trait_type === types[selectedType].name
            )
            .map((item: IERC721MetadataModel, index: number) => (
              <div
                onClick={() => handleAddition(item)}
                className="relative h-full w-full cursor-pointer rounded border-2 border-gray-400 transition duration-300 ease-in-out hover:scale-105"
                key={index}
              >
                <img
                  className="h-full w-full"
                  src={item.image}
                  alt={item.name}
                />
                <SelectedCheckmark {...item} />
              </div>
            ))}
        </>
      </div>
    </>
  );
};
export default DynamicNFTComposer;
