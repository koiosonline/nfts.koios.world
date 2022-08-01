import PurchaseCard from "@/components/exchange/PuchaseCard";
import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useFilterStore } from "@/state/store";
import Image from "next/future/image";
import { useAccount } from "wagmi";

const Exchange = ({ items }: any) => {
  const account = useAccount();
  const pushFilter = useFilterStore((state) => state.addFilter);
  const popFilter = useFilterStore((state) => state.removeFilter);
  const filters = useFilterStore((state) => state.filters);

  const handleFilterClick = (filter: string) => {
    if (filters.includes(filter)) popFilter(filter);
    else pushFilter(filter);
  };

  if (!account.isConnected) {
    <div
      className={
        "flex h-screen w-full items-center justify-center bg-default-text text-center font-heading text-8xl text-brand-rose-hot-pink"
      }
    >
      Not Allowed
    </div>;
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-5">
      {/* <div className="container -m-20 mx-auto mb-10 flex h-20 items-center justify-center rounded bg-gray-900 px-10">
        <h1 className="bg-gradient-to-r from-brand-rose-hot-pink to-brand-purple-heart bg-clip-text text-center font-heading text-4xl text-transparent">
          Welcome to da shop
        </h1>
      </div> */}
      <div className="container mx-auto flex h-[80vh]">
        <div className="container flex h-full w-[25%] flex-col rounded bg-zinc-900">
          <div className="container flex h-[10vh] items-center justify-center  border-r-2 border-b-2 border-zinc-800 border-opacity-40 bg-zinc-900">
            <h1 className="bg-gradient-to-r from-brand-rose-hot-pink to-brand-purple-heart bg-clip-text text-center font-heading text-4xl text-transparent">
              Exchange
            </h1>
          </div>
          <div className="container flex h-[70vh] flex-col gap-5 border-r-2 border-zinc-800 border-opacity-40 p-10">
            {items.map((item: any, index: number) => (
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
                    width={1050}
                    height={1050}
                    className="h-full w-full rounded object-cover"
                    src={
                      filters.includes(item.attributes[0].trait_type)
                        ? `/nfts/${item.attributes[0].trait_type}_checked.png`
                        : `/nfts/${item.attributes[0].trait_type}_unchecked.png`
                    }
                    alt="Unminted NFT"
                  />
                </div>
                <div className="flex w-3/4 flex-col">
                  <h1 className=" font-heading text-2xl text-white">
                    {item.attributes[0].trait_type}
                  </h1>

                  <h2 className="font-heading text-base text-zinc-400">
                    Skin Colour Of Your Titan
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container flex w-[75%] flex-col">
          <div className="container flex h-[10vh] items-center gap-5 bg-zinc-900 p-10">
            {filters.map((item: any, index: number) => (
              <div className="h-6 w-20 rounded bg-zinc-800 p-1 text-center font-base text-xs font-semibold uppercase text-pink-500">
                {item}
              </div>
            ))}
          </div>
          <div className="container grid h-full grid-flow-row grid-cols-4 gap-5 rounded bg-zinc-800 p-10">
            {items
              .filter((x: any) => filters.includes(x.attributes[0].trait_type))
              .map((item: IERC721MetadataModel, index: number) => (
                <PurchaseCard props={item} key={index} />
              ))}
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
  };
}

export default Exchange;
