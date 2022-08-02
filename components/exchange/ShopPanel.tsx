import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useFilterStore } from "@/state/store";
import PurchaseCard from "./PuchaseCard";

const ShopPanel = (items: IERC721MetadataModel[]) => {
  const filters = useFilterStore((state) => state.filters);
  const data = Object.values(items);
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
