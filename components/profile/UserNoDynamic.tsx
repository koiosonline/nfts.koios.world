import MintERC721 from "./MintERC721";
import { motion } from "framer-motion";

const UserNoDynamic = () => {
  return (
    <div className="relative flex h-full w-full flex-col">
      <h1 className="h-1/6 font-heading text-2xl uppercase text-gray-200">
        No NFT
      </h1>

      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        width={850}
        height={850}
        className="h-3/4 w-full rounded object-contain"
        src="/nfts/unmintedNFT.png"
        alt="Unminted NFT"
      />
      <MintERC721 />
    </div>
  );
};

export default UserNoDynamic;
