import { useUserClaims } from "@/api/hooks/useUserClaims";
import { useUserLayers } from "@/api/hooks/useUserLayers";
import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import IUserClaimModel from "@/models/IUserClaimModel";
import { useModalStore, useUserStore } from "@/state/store";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import ClaimERC1155 from "./ClaimERC1155";

const ClaimsModal = (items: IERC721MetadataModel[]) => {
  const user = useUserStore((state) => state.user);
  const { data, isError, isLoading } = useUserClaims(user);
  const toggleClaimsModal = useModalStore((state) => state.toggleClaimsModal);
  const { data: userLayer, isLoading: isUserLayerLoading } =
    useUserLayers(user);

  const [fil, setFilItems] = useState<IERC721MetadataModel[]>([]);

  useEffect(() => {
    if (data && userLayer) {
      const dataArray: IUserClaimModel[] = data;
      const filteredItems: IERC721MetadataModel[] = [];
      const newArr = Object.values(items);

      for (let item of dataArray) {
        const foundMetadata = newArr.findIndex(
          (x) => x.tokenId === item.tokenId
        );
        if (foundMetadata >= 0 && !userLayer.includes(item.tokenId)) {
          filteredItems.push(newArr[foundMetadata]);
        }
      }
      setFilItems(filteredItems);
    }
  }, []);

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
            <h1 className="text-xl md:text-4xl">Pending Claims</h1>
          </div>
          <div
            onClick={() => toggleClaimsModal()}
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
          <div className="flex h-full w-full flex-col overflow-y-auto">
            {fil.map((item: IERC721MetadataModel, index: number) => (
              <div
                key={index}
                className="mb-5 flex w-full items-center justify-between rounded bg-zinc-800 p-5"
              >
                <h1 className="font-heading text-2xl text-white">
                  {item.attributes[0].value}
                </h1>
                <ClaimERC1155 tokenId={item.tokenId} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClaimsModal;
