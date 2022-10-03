import { useUserClaims } from "@/api/hooks/useUserClaims";
import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useModalStore, useUserStore } from "@/state/store";
import { motion } from "framer-motion";
import { IoCloseCircleSharp } from "react-icons/io5";
import FilterPanel from "./FilterPanel";

const MobileFilterModal = (items: IERC721MetadataModel[]) => {
  const user = useUserStore((state) => state.user);
  const { data, isError, isLoading } = useUserClaims(user);
  const toggleFilterModal = useModalStore((state) => state.toggleFilterModal);
  const toggleClaimsModal = useModalStore((state) => state.toggleClaimsModal);
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
        <div className="flex h-[85%] w-full flex-col justify-between rounded bg-zinc-900 p-2 pt-5 md:p-10">
          {data && data.length > 0 ? (
            <div className="flex h-10 w-full">
              <button
                onClick={() => toggleClaimsModal()}
                className="relative h-10 w-40 rounded  bg-zinc-800 p-3 text-center font-base text-xs font-semibold uppercase text-pink-500 transition duration-300 hover:bg-zinc-700"
              >
                Check Claims!
              </button>
            </div>
          ) : null}
          <FilterPanel {...items} />
        </div>
      </div>
    </motion.div>
  );
};

export default MobileFilterModal;
