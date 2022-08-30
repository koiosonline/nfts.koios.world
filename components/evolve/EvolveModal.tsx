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
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-default-text/30 p-5 backdrop-blur md:p-20"
    >
      <div className="flex h-full w-3/4 flex-col gap-2 rounded">
        <div className="flex h-[5%] w-full items-center justify-between rounded bg-zinc-700 p-10 md:h-1/6">
          <div className=" flex flex-col font-heading uppercase text-white">
            <h1 className="text-xl md:text-4xl">Evolving</h1>
          </div>
          <div
            onClick={() => closeEvolveModal()}
            className="cursor-pointer fill-white transition duration-300 ease-in-out hover:fill-brand-rose-hot-pink "
          >
            <IoCloseCircleSharp
              fill="text-gray-400"
              size={50}
              className="scale-75 md:scale-100"
            />
          </div>
        </div>
        <div className="flex h-[95%] w-full flex-col rounded-b bg-zinc-800 md:h-5/6 md:flex-row">
          <div className="flex h-full w-full items-center justify-center border-none border-zinc-400 border-opacity-40 p-5 md:w-1/2 md:border-r-2 md:border-dashed md:p-10">
            <CanvasComposer {...item} />
          </div>
          <div className="flex h-full w-full flex-col bg-zinc-800 p-5 md:w-1/2">
            <div className="flex h-1/5 w-full flex-col items-center justify-center gap-5 md:h-1/4">
              {!evolveSuccess && (
                <>
                  <h1 className="text-center font-heading text-lg uppercase text-white md:text-2xl">
                    {data ? "Ascend Your Titan!!!" : "Sign For Verification"}
                  </h1>

                  {!data && (
                    <button
                      onClick={() => signMessage()}
                      className="flex h-10  w-1/2 items-center justify-center rounded bg-brand-rose-hot-pink font-heading text-sm uppercase transition duration-300 hover:bg-brand-rose-pale-rose md:text-lg"
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
                    <>
                      {!evolving && !evolveError && (
                        <button
                          onClick={() => evolveNFT()}
                          className="flex h-10 w-1/2 items-center justify-center rounded bg-brand-rose-hot-pink font-heading uppercase transition duration-300 hover:bg-brand-rose-pale-rose"
                        >
                          Evolve
                        </button>
                      )}

                      {evolving && !evolveError && (
                        <button className="flex h-10 w-1/2 cursor-progress items-center justify-center rounded bg-brand-rose-hot-pink font-heading uppercase ">
                          <Spinner /> Evolving...
                        </button>
                      )}

                      {evolveError && (
                        <button
                          onClick={() => evolveNFT()}
                          className="flex h-10 w-1/2 items-center justify-center rounded bg-brand-rose-hot-pink font-heading uppercase transition duration-300 hover:bg-brand-rose-pale-rose"
                        >
                          Try Again
                        </button>
                      )}
                    </>
                  )}
                </>
              )}
              {evolveSuccess && (
                <h1 className="text-center font-heading text-lg uppercase text-white md:text-2xl">
                  E V O L V E D ! ! ! 😎
                </h1>
              )}
            </div>
            <div className="flex h-4/5 w-full flex-col items-center justify-evenly gap-2 p-5 md:h-3/4">
              <div className="flex h-1/6 flex-col gap-2 md:gap-4">
                <h1 className="text-center font-heading text-lg uppercase text-zinc-400 md:text-2xl">
                  Name
                </h1>
                <h2 className="text-center font-heading text-base uppercase text-white md:text-lg">
                  {nftName}
                </h2>
              </div>
              <div className="flex h-3/6 w-full flex-col gap-2 md:gap-4">
                <h1 className="text-center font-heading text-lg uppercase text-zinc-400 md:text-2xl">
                  Description
                </h1>
                <textarea
                  readOnly
                  value={nftDescription}
                  className=" h-full resize-none overflow-y-scroll rounded bg-zinc-700 p-5 text-left font-heading text-xs uppercase italic text-white"
                ></textarea>
              </div>
              <div className="flex h-1/6 flex-col gap-2 md:gap-4">
                <h1 className="text-center font-heading text-lg uppercase text-zinc-400 md:text-2xl">
                  External URL
                </h1>
                <h2 className="text-center font-heading text-base uppercase text-white md:text-lg">
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
