import IERC721MetadataModel from "@/models/IERC721MetadataModel";
import { useModalStore } from "@/state/store";
import { useEffect, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import crypto from "crypto";
import { useSignMessage } from "wagmi";
import { generateProof } from "@/api/exchange/generateProof";
import { IResponseMessage } from "@/models/IResponseMessage";
import Spinner from "../util/Spinner";
import MintERC1155 from "./MintERC1155";

const PurchaseModel = (item: IERC721MetadataModel) => {
  const closeModal = useModalStore((state) => state.closeModal);

  const [userSalt, setUserSalt] = useState("");
  const [proofResponse, setProofResponse] = useState<IResponseMessage>();
  const [proofSignature, setProofSignature] = useState<string>("");
  const [proofHash, setProofHash] = useState<string>("");
  const [noCouponError, setNoCouponError] = useState<string>("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
  });

  const { data, isError, isLoading, isSuccess, signMessage, error } =
    useSignMessage({
      message: userSalt,
    });

  useEffect(() => {
    if (!data) {
      setUserSalt(crypto.randomBytes(16).toString("base64"));
    }
  }, [data]);

  useEffect(() => {
    if (proofResponse) {
      setProofSignature(proofResponse.data.signature);
      setProofHash(proofResponse.data.saltHash);
    }
  }, [proofResponse]);

  const retrieveProof = async () => {
    if (data && userSalt) {
      const proofData: IResponseMessage = await generateProof(
        data,
        userSalt,
        item.tokenId
      );
      if (proofData.error) {
        setNoCouponError(proofData.message);
      } else {
        setProofResponse(proofData);
        console.log(proofData);
      }
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-default-text/30 p-20 backdrop-blur">
      <div className="flex h-full w-3/4 flex-col rounded">
        <div className="flex h-1/6 w-full justify-between rounded-t bg-zinc-700 p-10">
          <div className=" flex flex-col font-heading uppercase text-white">
            <h1 className="text-4xl">Purchasing</h1>
            <h2 className="text-2xl text-zinc-400">
              {item.attributes[0].trait_type}: {item.attributes[0].value}
            </h2>
          </div>
          <div
            onClick={() => closeModal()}
            className="cursor-pointer fill-white transition duration-300 ease-in-out hover:fill-brand-rose-hot-pink "
          >
            <IoCloseCircleSharp fill="text-gray-400" size={50} />
          </div>
        </div>
        <div className="flex h-5/6 w-full rounded-b bg-zinc-800">
          <div className="flex h-full w-1/2 items-center justify-center border-r-2 border-dashed border-zinc-400 border-opacity-40">
            <img
              width={850}
              height={850}
              className="w-full rounded object-contain"
              src={item.image}
              alt="Unminted NFT"
            />
          </div>
          <div className="flex h-full w-1/2 flex-col bg-zinc-800">
            <div className="flex h-full w-full flex-col gap-10 p-10">
              <div className="flex h-1/4 w-full flex-col items-center justify-center gap-5">
                <h1 className="text-center font-heading text-2xl uppercase text-white">
                  Sign For Verification
                </h1>

                {!data && (
                  <button
                    onClick={() => signMessage()}
                    className="flex h-10 w-1/2 items-center justify-center rounded bg-brand-rose-hot-pink font-heading uppercase"
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
                    <button
                      onClick={() => retrieveProof()}
                      className="h-10 w-1/2 rounded bg-brand-rose-hot-pink font-heading uppercase "
                    >
                      Generate Proof
                    </button>
                    <p className=" text-center text-xs uppercase italic text-action-error">
                      GENERATING A SIGNATURE WILL DEDUCT A COUPON! <br />
                      When generated signature data will show. Save it if you
                      want to be sure
                    </p>
                  </>
                )}
              </div>
              <div className="flex h-2/4 w-full flex-col items-center justify-center gap-2">
                {noCouponError && (
                  <p className="text-center font-heading text-xl uppercase italic text-action-error">
                    {noCouponError}
                  </p>
                )}
                {proofHash && proofSignature && (
                  <>
                    <h1 className="text-center font-heading text-2xl uppercase text-white">
                      Signature Data
                    </h1>
                    <h2 className="font-heading text-xl uppercase text-zinc-400">
                      Token: {item.tokenId}
                    </h2>
                    <h2 className="font-heading text-xl uppercase text-zinc-400">
                      Salt
                    </h2>
                    <textarea
                      readOnly
                      value={proofHash}
                      className="h-10 w-full resize-none rounded p-2 text-center font-heading "
                    ></textarea>
                    <h2 className="font-heading text-xl uppercase text-zinc-400">
                      Signature
                    </h2>
                    <textarea
                      readOnly
                      value={proofSignature}
                      className="h-28 w-full resize-none rounded p-2 text-center font-heading"
                    ></textarea>
                  </>
                )}
              </div>
              <div className="flex h-1/4 w-full flex-col items-center justify-center gap-2">
                <MintERC1155
                  proofHash={proofHash}
                  proofSignature={proofSignature}
                  tokenId={item.tokenId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PurchaseModel;