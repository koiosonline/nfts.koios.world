import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useFilterStore, useUserStore } from "@/state/store";
import PurchaseCard from "./PuchaseCard";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useUserLayers } from "@/api/hooks/useUserLayers";

const ShopPanel = (items: IERC721MetadataModel[]) => {
  const user = useUserStore((state) => state.user);
  const filters = useFilterStore((state) => state.filters);
  const owned = useFilterStore((state) => state.owned);
  const givenItems = Object.values(items);
  const [parent] = useAutoAnimate<HTMLDivElement>({
    easing: "ease-in-out",
  });
  const { data, isError, isLoading } = useUserLayers(user);

  if (owned === 1 && filters.length === 0 && data) {
    return (
      <div
        ref={parent}
        className="container grid h-full grid-flow-row grid-cols-2 gap-5 overflow-y-scroll rounded bg-zinc-800 p-2 md:grid-cols-4 md:p-10"
      >
        {givenItems
          .filter((x) => data.includes(x.tokenId))
          .map((item: IERC721MetadataModel, index: number) => (
            <PurchaseCard {...item} key={index} />
          ))}
      </div>
    );
  }

  if (owned === 1 && filters.length > 0 && data) {
    return (
      <div
        ref={parent}
        className="container grid h-full grid-flow-row grid-cols-2 gap-5 overflow-y-scroll rounded bg-zinc-800 p-2 md:grid-cols-4 md:p-10"
      >
        {givenItems
          .filter((x) => data.includes(x.tokenId))
          .filter((x) => filters.includes(x.attributes[0].trait_type))
          .map((item: IERC721MetadataModel, index: number) => (
            <PurchaseCard {...item} key={index} />
          ))}
      </div>
    );
  }

  if (owned === 2 && filters.length === 0 && data) {
    return (
      <div
        ref={parent}
        className="container grid h-full grid-flow-row grid-cols-2 gap-5 overflow-y-scroll rounded bg-zinc-800 p-2 md:grid-cols-4 md:p-10"
      >
        {givenItems
          .filter((x) => !data.includes(x.tokenId))
          .map((item: IERC721MetadataModel, index: number) => (
            <PurchaseCard {...item} key={index} />
          ))}
      </div>
    );
  }

  if (owned === 2 && filters.length > 0 && data) {
    return (
      <div
        ref={parent}
        className="container grid h-full grid-flow-row grid-cols-2 gap-5 overflow-y-scroll rounded bg-zinc-800 p-2 md:grid-cols-4 md:p-10"
      >
        {givenItems
          .filter((x) => !data.includes(x.tokenId))
          .filter((x) => filters.includes(x.attributes[0].trait_type))
          .map((item: IERC721MetadataModel, index: number) => (
            <PurchaseCard {...item} key={index} />
          ))}
      </div>
    );
  }

  if (owned === 0 && filters.length === 0) {
    return (
      <div
        ref={parent}
        className="container grid h-full grid-flow-row grid-cols-2 gap-5 overflow-y-scroll rounded bg-zinc-800 p-2 md:grid-cols-4 md:p-10"
      >
        {givenItems.map((item: IERC721MetadataModel, index: number) => (
          <PurchaseCard {...item} key={index} />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={parent}
      className="container grid h-full grid-flow-row grid-cols-2 gap-5 overflow-y-scroll rounded bg-zinc-800 p-2 md:grid-cols-4 md:p-10"
    >
      {givenItems
        .filter((x: any) => filters.includes(x.attributes[0].trait_type))
        .map((item: IERC721MetadataModel, index: number) => (
          <PurchaseCard {...item} key={index} />
        ))}
    </div>
  );
};
export default ShopPanel;
