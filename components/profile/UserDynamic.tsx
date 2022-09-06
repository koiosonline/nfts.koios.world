import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { motion } from "framer-motion";

const UserDynamic = (data: IERC721MetadataModel) => {
  return (
    <div className="flex h-full w-full flex-col">
      <h1 className="h-1/4 truncate font-heading text-2xl uppercase text-gray-200">
        {data.name}
      </h1>
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        width={850}
        height={850}
        className="h-full w-full rounded object-contain text-xl"
        src={data.image + "?t=" + new Date().getTime()}
        alt="Metadata Image"
      />
    </div>
  );
};

export default UserDynamic;
