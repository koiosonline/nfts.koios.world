import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useEvolveStore, useModalStore } from "@/state/store";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useSignMessage } from "wagmi";
import CanvasComposer from "./CanvasComposer";
import crypto from "crypto";
import Spinner from "../util/Spinner";
import IEvolveModel from "@/models/IEvolveModel";
import { evolveTitan } from "@/api/evolve/evolveTitan";
import { IResponseMessage } from "@/models/IResponseMessage";

const EvolveModal = ({ item }: any) => {
  const closeEvolveModal = useModalStore((state) => state.closeEvolveModal);
  const nftName = useEvolveStore((state) => state.nftName);
  const nftDescription = useEvolveStore((state) => state.nftDescription);
  const nftExternalURL = useEvolveStore((state) => state.nftExternalURL);
  const titan = useEvolveStore((state) => state.titan);
  const [userSalt, setUserSalt] = useState("");
  const [evolving, setEvolving] = useState(false);
  const [evolveSuccess, setEvolveSuccess] = useState(false);
  const [evolveError, setEvolveError] = useState(false);

  const { data, isError, isLoading, isSuccess, signMessage, error } =
    useSignMessage({
      message: userSalt,
    });

  useEffect(() => {
    if (!data) {
      setUserSalt(crypto.randomBytes(16).toString("base64"));
    }
  }, [data]);

  const evolveNFT = async () => {
    let tokenArray: number[] = [];
    titan.forEach((value, key) => {
      if (key === "Skin") tokenArray[0] = value;
      if (key === "Clothing") tokenArray[1] = value;
      if (key === "Hair") tokenArray[3] = value;
      if (key === "Head") tokenArray[2] = value;
      if (key === "Item") tokenArray[4] = value;
    });
    console.log(tokenArray);

    const evolveModel: IEvolveModel = {
      saltHash: userSalt,
      signature: data!,
      model: {
        name: nftName,
        description: nftDescription,
        external_url: nftExternalURL,
        tokenId: item.tokenId,
        image: item.image,
        attributes: item.attributes,
      },
      tokens: tokenArray,
    };

    setEvolving(true);
    const evolveResponse: IResponseMessage = await evolveTitan(evolveModel);
    if (evolveResponse.success) {
      setEvolveSuccess(true);
    } else {
      setEvolveError(true);
    }
  };

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
        <div className="flex h-5/6 w-full rounded-b bg-zinc-800">
          <div className="flex h-full w-1/2 items-center justify-center border-r-2 border-dashed border-zinc-400 border-opacity-40 p-10">
            <CanvasComposer {...item} />
          </div>
          <div className="flex h-full w-1/2 flex-col bg-zinc-800">
            <div className="flex h-1/4 w-full flex-col items-center justify-center gap-5">
              {!evolveSuccess && (
                <>
                  <h1 className="text-center font-heading text-2xl uppercase text-white">
                    {data ? "Ascend Your Titan!!!" : "Sign For Verification"}
                  </h1>

                  {!data && (
                    <button
                      onClick={() => signMessage()}
                      className="flex h-10 w-1/2 items-center justify-center rounded bg-brand-rose-hot-pink font-heading uppercase transition duration-300 hover:bg-brand-rose-pale-rose"
                    >
                      {isLoading ? (
                        <>
                          <Spinner /> Awaiting Signature...
                        </>
                      ) : (
                        "Sign"
                      )}
                    </button>
                  )}

                  {data && (
                    <button
                      onClick={() => evolveNFT()}
                      className="flex h-10 w-1/2 items-center justify-center rounded bg-brand-rose-hot-pink font-heading uppercase transition duration-300 hover:bg-brand-rose-pale-rose"
                    >
                      {evolving && !evolveError ? (
                        <>
                          <Spinner /> Evolving...
                        </>
                      ) : (
                        "Evolve"
                      )}
                      {evolveError && "Try Again"}
                    </button>
                  )}
                </>
              )}
              {evolveSuccess && (
                <h1 className="text-center font-heading text-2xl uppercase text-white">
                  E V O L V E D ! ! ! 😎
                </h1>
              )}
            </div>
            <div className="flex h-3/4 w-full flex-col items-center justify-evenly gap-2 p-5">
              <div className="flex h-1/6 flex-col gap-4">
                <h1 className="text-center font-heading text-2xl uppercase text-zinc-400">
                  Name
                </h1>
                <h2 className="text-center font-heading text-lg uppercase text-white">
                  {nftName}
                </h2>
              </div>
              <div className="flex h-3/6 flex-col gap-4 ">
                <h1 className="text-center font-heading text-2xl uppercase text-zinc-400">
                  Description
                </h1>
                <p className=" overflow-y-scroll text-left font-heading text-xs uppercase italic text-white">
                  {nftDescription}
                </p>
              </div>
              <div className="flex h-1/6 flex-col gap-4">
                <h1 className="text-center font-heading text-2xl uppercase text-zinc-400">
                  External URL
                </h1>
                <h2 className="text-center font-heading text-lg uppercase text-white">
                  {nftExternalURL}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default EvolveModal;
