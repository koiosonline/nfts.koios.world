import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useEvolveStore, useModalStore, useNFTState } from "@/state/store";

const PurchaseCard = (item: IERC721MetadataModel) => {
  const isOpen = useModalStore((state) => state.open);
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const nfts = useNFTState((state) => state.nfts);
  const addClothing = useEvolveStore((state) => state.addClothing);

  const handleModal = (layer: IERC721MetadataModel) => {
    if (isOpen) {
      closeModal();
    } else {
      openModal(layer);
    }
  };

  if (nfts && nfts.length === 0) {
    return (
      <div className="group container flex max-h-[300px] min-h-[300px] animate-pulse flex-col rounded bg-zinc-900 p-1 shadow transition duration-300 ease-in-out hover:-translate-y-1">
        <div className="mt-2 flex h-[15%]  w-full flex-col items-center justify-center gap-2 rounded p-2">
          <div className="h-1/2 w-full rounded bg-zinc-800"></div>
          <div className="h-1/2 w-full rounded bg-zinc-800"></div>
        </div>
        <div className="bottom-2 h-[70%] w-full rounded p-2">
          <div className="flex h-full rounded bg-zinc-700 text-center font-heading"></div>
        </div>
        <div className=" flex  h-[15%] w-full animate-pulse items-center justify-center rounded bg-zinc-700 p-2  transition duration-300">
          <div className=" h-full w-full rounded bg-zinc-800"></div>{" "}
        </div>
      </div>
    );
  }

  return (
    <div className="group container flex max-h-[300px] min-h-[300px] flex-col rounded bg-zinc-900 p-1 shadow transition duration-300 ease-in-out hover:-translate-y-1">
      <div className="mt-2 flex h-[15%]  w-full flex-col items-center justify-center rounded">
        <h1 className="text-center font-heading text-xl uppercase text-white transition duration-300 group-hover:text-brand-rose-hot-pink">
          {item.attributes[0].value}
        </h1>{" "}
        <h2 className="text-center font-heading text-sm uppercase text-zinc-400 transition duration-300 group-hover:text-brand-rose-lavender">
          {item.attributes[0].trait_type}
        </h2>{" "}
      </div>
      <div className="bottom-2 h-[70%] w-full ">
        <div className="flex h-full text-center font-heading text-zinc-400">
          <img
            width={100}
            height={100}
            className="w-full rounded object-cover"
            src={item.image}
            alt={`${item.attributes[0].value} Image`}
          />
        </div>
      </div>
      {nfts?.includes(item.tokenId) ? (
        <div className="flex h-[15%] w-full items-center justify-center rounded bg-brand-blue-picton transition duration-300">
          <h1 className="text-center font-heading text-2xl uppercase">Owned</h1>{" "}
        </div>
      ) : (
        <button
          onClick={() => handleModal(item)}
          className="flex h-[15%] w-full items-center justify-center rounded bg-brand-rose-hot-pink transition duration-300 hover:bg-brand-rose-pale-rose"
        >
          <h1 className="text-center font-heading text-2xl uppercase">Buy</h1>{" "}
        </button>
      )}
    </div>
  );
};

export default PurchaseCard;
