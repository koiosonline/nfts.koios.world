import { useModalStore } from "@/state/store";
import { motion } from "framer-motion";
import { IoCloseCircleSharp } from "react-icons/io5";

const EvolveModal = () => {
  const closeEvolveModal = useModalStore((state) => state.closeEvolveModal);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-default-text/30 p-20 backdrop-blur"
    >
      <div className="flex h-full w-3/4 flex-col rounded">
        <div className="flex h-1/6 w-full justify-between rounded-t bg-zinc-700 p-10">
          <div className=" flex flex-col font-heading uppercase text-white">
            <h1 className="text-4xl">Evolving</h1>
          </div>
          <div
            onClick={() => closeEvolveModal()}
            className="cursor-pointer fill-white transition duration-300 ease-in-out hover:fill-brand-rose-hot-pink "
          >
            <IoCloseCircleSharp fill="text-gray-400" size={50} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default EvolveModal;
