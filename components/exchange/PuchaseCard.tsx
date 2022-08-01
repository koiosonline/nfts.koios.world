import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import Image from "next/future/image";

const PurchaseCard = ({ props }: any) => {
  return (
    <div className="container flex max-h-[300px] min-h-[200px] flex-col rounded bg-zinc-900 p-1 shadow transition duration-300 ease-in-out hover:-translate-y-1">
      <div className="flex h-[15%]  w-full items-center justify-center rounded bg-brand-purple-heart">
        <h1 className="text-center font-heading text-2xl uppercase">
          {props.attributes[0].value}
        </h1>{" "}
      </div>
      <div className="bottom-2 h-[70%] w-full ">
        <div className="flex h-full">
          <img
            width={100}
            height={100}
            className="w-full rounded object-cover"
            src={props.image}
            alt="Unminted NFT"
          />
        </div>
      </div>
      <div className="flex h-[15%] w-full cursor-pointer items-center justify-center rounded bg-brand-rose-hot-pink transition duration-300 hover:bg-brand-rose-pale-rose">
        <h1 className="text-center font-heading text-2xl uppercase">Buy</h1>{" "}
      </div>
    </div>
  );
};

export default PurchaseCard;
