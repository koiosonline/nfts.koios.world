import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useModalStore } from "@/state/store";
import { motion } from "framer-motion";
import { IoCloseCircleSharp } from "react-icons/io5";
import FilterPanel from "./FilterPanel";

const MobileFilterModal = (items: IERC721MetadataModel[]) => {
  const toggleFilterModal = useModalStore((state) => state.toggleFilterModal);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-default-text/30 p-5 backdrop-blur md:p-20"
    >
      <div className="flex h-full w-full flex-col rounded md:w-1/2">
        <div className="flex h-[5%] w-full items-center justify-between rounded bg-zinc-700 p-7 md:p-10">
          <div className=" flex flex-col font-heading uppercase text-white">
            <h1 className="text-xl md:text-4xl">Filters</h1>
          </div>
          <div
            onClick={() => toggleFilterModal()}
            className="cursor-pointer fill-white transition duration-300 ease-in-out hover:fill-brand-rose-hot-pink "
          >
            <IoCloseCircleSharp
              fill="text-gray-400"
              size={50}
              className=" scale-75 md:scale-100"
            />
          </div>
        </div>
        <div className="flex h-[85%] w-full justify-between rounded bg-zinc-900 p-2 pt-5 md:p-10">
          <FilterPanel {...items} />
        </div>
      </div>
    </motion.div>
  );
};

export default MobileFilterModal;
