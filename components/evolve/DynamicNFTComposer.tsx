import DropdownButton from "../util/DropdownButton";
import DropdownItems from "../util/DropdownItems";
import { useEffect, useState } from "react";
import { useEvolveStore, useNFTState, useUserStore } from "@/state/store";
import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import SelectedCheckmark from "./SelectedCheckMark";
import { useUserData } from "@/api/hooks/useUserData";
import { mutate } from "swr";

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
  const user = useUserStore((state) => state.user);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<number>(0);
  const ownedLayers = useEvolveStore((state) => state.ownedLayers);
  const setOwnedLayers = useEvolveStore((state) => state.setOwnedLayers);
  const deleteLayer = useEvolveStore((state) => state.deleteLayer);

  const titan = useEvolveStore((state) => state.titan);
  const [parent] = useAutoAnimate<HTMLDivElement>({
    easing: "ease-in-out",
  });

  const resetTitan = useEvolveStore((state) => state.resetTitan);
  const { tokenIds, isError, isLoading } = useUserData(user);

  const handleAddition = (layer: IERC721MetadataModel) => {
    if (titan.get(layer.attributes[0].trait_type) === layer.tokenId) {
      deleteLayer();
      titan.set(layer.attributes[0].trait_type, 0);
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
    const data = Object.values(items);
    const newData = data[0].filter((x) => tokenIds.includes(x.tokenId));
    if (newData) {
      setOwnedLayers(newData);
    }
  }, [selectedType]);

  useEffect(() => {
    resetTitan();
    mutate(user);
    setSelectedType(0);
  }, [user]);

  return (
    <>
      <div className="relative h-[20%] items-center justify-center md:w-full">
        <h1 className="mb-2 font-heading text-xl text-zinc-400 md:text-3xl">
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
