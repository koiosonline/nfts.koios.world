import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useFilterStore } from "@/state/store";
import Image from "next/future/image";
import { useEffect, useState } from "react";

const FilterPanel = (items: IERC721MetadataModel[]) => {
  const pushFilter = useFilterStore((state) => state.addFilter);
  const popFilter = useFilterStore((state) => state.removeFilter);
  const filters = useFilterStore((state) => state.filters);
  const owned = useFilterStore((state) => state.owned);
  const unOwned = useFilterStore((state) => state.unowned);
  const toggleOwned = useFilterStore((state) => state.toggleOwned);
  const toggleUnOwned = useFilterStore((state) => state.toggleUnOwned);
  const [uniques, setUniques] = useState<IERC721MetadataModel[]>([]);

  const handleFilterClick = (filter: string) => {
    if (filters.includes(filter)) popFilter(filter);
    else pushFilter(filter);
  };

  useEffect(() => {
    console.log(items);
    const data = Object.values(items);
    const mapp: Map<string, IERC721MetadataModel> = new Map();
    const uniqueIds: IERC721MetadataModel[] = [];
    data.forEach((item) => {
      mapp.set(item.attributes[0].trait_type, item);
    });

    console.log(mapp);
    mapp.forEach((item) => {
      uniqueIds.push(item);
    });

    setUniques(uniqueIds);
  }, []);

  return (
    <div className="container flex h-[70vh] flex-col gap-5 border-r-2 border-zinc-800 border-opacity-40 p-2 md:p-10">
      <div className="flex w-full gap-5 font-heading">
        <div
          onClick={() => toggleOwned()}
          className={`group flex h-2/4 w-1/2 cursor-pointer items-center justify-center gap-5 rounded ${
            owned ? "bg-brand-rose-hot-pink" : "bg-zinc-800"
          }  p-1 text-center uppercase shadow transition duration-300 hover:-translate-y-1 `}
        >
          <div
            className={`flex w-3/4 flex-col  items-center justify-center ${
              owned ? "text-zinc-900" : "text-zinc-500"
            } p-5`}
          >
            Owned
          </div>
        </div>
        <div
          onClick={() => toggleUnOwned()}
          className={`group flex h-2/4 w-1/2 cursor-pointer items-center justify-center gap-5 rounded ${
            unOwned ? "bg-brand-rose-hot-pink" : "bg-zinc-800"
          }  p-1 text-center uppercase shadow transition duration-300 hover:-translate-y-1 `}
        >
          <div
            className={`flex w-3/4 flex-col  items-center justify-center ${
              unOwned ? "text-zinc-900" : "text-zinc-500"
            } p-5`}
          >
            Unowned
          </div>
        </div>
      </div>

      {uniques.map((item: IERC721MetadataModel, index: number) => (
        <div
          onClick={() => handleFilterClick(item.attributes[0].trait_type)}
          className="group flex w-full cursor-pointer items-center justify-center gap-5 rounded bg-zinc-800 p-1 shadow transition duration-300 hover:-translate-y-1 "
          key={index}
        >
          <div
            className={`h-full w-1/4 rounded transition duration-300 ease-in-out group-hover:bg-zinc-800 ${
              filters.includes(item.attributes[0].trait_type)
                ? "bg-zinc-800"
                : "bg-zinc-300"
            }`}
          >
            <Image
              priority
              width={500}
              height={500}
              className="flex h-full w-full items-center justify-center rounded object-cover text-center font-heading text-xs transition duration-300 ease-in-out"
              src={
                filters.includes(item.attributes[0].trait_type)
                  ? `/nfts/${item.attributes[0].trait_type}_checked.webp`
                  : `/nfts/${item.attributes[0].trait_type}_unchecked.webp`
              }
              alt={`${item.attributes[0].trait_type} Image`}
            />
          </div>
          <div className="flex w-3/4 flex-col">
            <h1 className=" font-heading text-2xl text-white">
              {item.attributes[0].trait_type}
            </h1>

            <h2 className="font-heading text-base text-zinc-400">
              {item.description}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};
export default FilterPanel;
