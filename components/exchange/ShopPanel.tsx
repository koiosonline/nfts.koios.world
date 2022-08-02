import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useFilterStore, useNFTState } from "@/state/store";
import PurchaseCard from "./PuchaseCard";

const ShopPanel = (items: IERC721MetadataModel[]) => {
  const filters = useFilterStore((state) => state.filters);
  const owned = useFilterStore((state) => state.owned);
  const nfts = useNFTState((state) => state.nfts);
  const data = Object.values(items);

  if (owned && filters.length == 0) {
    return (
      <div className="container grid h-full grid-flow-row grid-cols-4 gap-5 overflow-y-scroll rounded bg-zinc-800 p-10">
        {data
          .filter((x) => nfts?.includes(x.tokenId))
          .map((item: IERC721MetadataModel, index: number) => (
            <PurchaseCard {...item} key={index} />
          ))}
      </div>
    );
  }

  if (owned && filters.length > 0) {
    return (
      <div className="container grid h-full grid-flow-row grid-cols-4 gap-5 overflow-y-scroll rounded bg-zinc-800 p-10">
        {data
          .filter((x) => nfts?.includes(x.tokenId))
          .filter((x) => filters.includes(x.attributes[0].trait_type))
          .map((item: IERC721MetadataModel, index: number) => (
            <PurchaseCard {...item} key={index} />
          ))}
      </div>
    );
  }

  if (filters.length === 0) {
    return (
      <div className="container grid h-full grid-flow-row grid-cols-4 gap-5 overflow-y-scroll rounded bg-zinc-800 p-10">
        {data.map((item: IERC721MetadataModel, index: number) => (
          <PurchaseCard {...item} key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="container grid h-full grid-flow-row grid-cols-4 gap-5 overflow-y-scroll rounded bg-zinc-800 p-10">
      {data
        .filter((x: any) => filters.includes(x.attributes[0].trait_type))
        .map((item: IERC721MetadataModel, index: number) => (
          <PurchaseCard {...item} key={index} />
        ))}
    </div>
  );
};
export default ShopPanel;
