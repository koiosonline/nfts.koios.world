import DropdownButton from "../util/DropdownButton";
import DropdownItems from "../util/DropdownItems";
import { useEffect, useState } from "react";
import { useEvolveStore, useUserStore } from "@/state/store";
import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import SelectedCheckmark from "./SelectedCheckMark";
import { useUserLayers } from "@/api/hooks/useUserLayers";
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
  const { data, isError, isLoading } = useUserLayers(user);

  const handleAddition = (layer: IERC721MetadataModel) => {
    if (titan.get(layer.attributes[0].trait_type) === layer.tokenId) {
      useEvolveStore.setState((state) => ({
        titan: new Map(state.titan).set(layer.attributes[0].trait_type, 0),
      }));
      deleteLayer();
    } else {
      useEvolveStore.setState((state) => ({
        titan: new Map(state.titan).set(
          layer.attributes[0].trait_type,
          layer.tokenId
        ),
      }));
    }
    deleteLayer();
  };

  const handleItemChange = (index: number) => {
    setSelectedType(index);
    setOpenMenu(false);
  };

  useEffect(() => {
    const givenItems = Object.values(items);
    const newData = givenItems[0].filter((x) => data.includes(x.tokenId));
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
                className="relative h-full max-h-[115px] min-h-[115px] w-full min-w-[115px] cursor-pointer rounded border-2 border-gray-400 transition duration-300 ease-in-out hover:scale-105 md:max-h-full"
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
