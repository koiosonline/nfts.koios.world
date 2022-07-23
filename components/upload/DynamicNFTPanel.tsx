import { useEffect, useState } from "react";
import { useSignMessage } from "wagmi";
import crypto from "crypto";
import FileInputArea from "@/components/util/FileInputArea";
import SignMessageButton from "@/components/util/SignMessageButton";
import SwitchButton from "./SwitchButton";
import FormInputText from "@/components/util/FormInputText";
import ErrorMessage from "@/components/util/ErrorMessage";
import { IResponseMessage } from "@/models/IResponseMessage";
import IUploadModel from "@/models/IUploadModel";
import IWhitelistModel from "@/models/IWhitelistModel";
import { uploadSingleAddress } from "@/api/uploadSingleAddress";
import {
  addressesFromFile,
  uploadMultipleAddresses,
} from "@/api/uploadMultipleAddresses";

const DynamicNFTPanel = () => {
  const [saltHash, setSaltHash] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>();
  const [singleUpload, setSingleUpload] = useState<boolean>(false);
  const [addressData, setAddressData] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [uploadResponse, setUploadResponse] = useState<IResponseMessage>();

  const { data, isError, isLoading, isSuccess, signMessage, error } =
    useSignMessage({
      message: saltHash,
    });

  useEffect(() => {
    if (!data) {
      setSaltHash(crypto.randomBytes(16).toString("base64"));
    }
  }, [data]);

  useEffect(() => {
    if (uploadResponse) {
      if (!uploadResponse.error) {
        setUploading(false);
        setSuccess(true);
      } else {
        setUploading(false);
        setSuccess(false);
        setErrorMessage(uploadResponse.message);
      }
    }
  }, [uploadResponse]);

  const upload = async () => {
    if (addressData.length === 42) {
      const model: IWhitelistModel = {
        address: addressData,
      };
      const uploadModel: IUploadModel = {
        saltHash,
        signature: data!,
        data: model,
      };
      setUploading(true);
      const res: IResponseMessage = await uploadSingleAddress(uploadModel);

      setUploadResponse(res);
    }

    if (file) {
      setUploading(true);
      const whitelistData: IWhitelistModel[] = await addressesFromFile(file);
      const res = await uploadMultipleAddresses(whitelistData, saltHash, data!);
      setUploadResponse(res);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 py-12 px-4 text-brand-purple-portage sm:px-6 lg:px-8">
      <div className="z-10 flex min-h-[450px] w-full flex-col gap-5 rounded-xl bg-gray-900 p-10 sm:max-w-lg lg:min-w-[550px]">
        {success && (
          <div className="flex flex-col items-center justify-center gap-4 text-xl text-action-valid">
            Successfully Uploaded 🎉
            <button
              className="flex w-48 items-center justify-center rounded bg-brand-purple-heart px-6 py-2.5 text-center text-lg uppercase leading-tight text-default-text shadow-md transition duration-300 hover:bg-brand-purple-heliotrope"
              type="button"
              onClick={() => {
                setSuccess(!success);
                setErrorMessage("");
                setAddressData("");
                setFile(null);
              }}
            >
              New Address
            </button>
          </div>
        )}
        {!success && (
          <>
            <SwitchButton
              setSingleUpload={setSingleUpload}
              singleUpload={singleUpload}
            />
            {isError && (
              <ErrorMessage
                errorMessage={error?.message + ", please sign again!"}
              />
            )}
            <ErrorMessage errorMessage={errorMessage} />
            {uploading && <h1 className="text-4xl"> UPLOADING</h1>}
            <h1 className="text-4xl">
              {singleUpload ? "Single Address" : "Multiple Addresses"}
            </h1>

            <div className="grid grid-cols-1 space-y-2">
              {!singleUpload && !file && <FileInputArea setFile={setFile} />}
              {file && (
                <p className="text-sm">
                  {file.name}{" "}
                  <span
                    onClick={() => setFile(null)}
                    className="ml-2 cursor-pointer transition duration-300 hover:text-action-warning"
                  >
                    X
                  </span>
                </p>
              )}
              {singleUpload && (
                <FormInputText setText={setAddressData} text={addressData} />
              )}
            </div>

            {!data && (file || addressData.length === 42) ? (
              <SignMessageButton signMessage={signMessage} />
            ) : (
              <></>
            )}

            {data && (file || addressData.length === 42) ? (
              <button
                onClick={() => upload()}
                className={`
                WS my-5 flex w-full cursor-pointer justify-center rounded bg-brand-purple-heart p-4 text-lg text-default-text transition duration-300 hover:bg-brand-purple-portage`}
              >
                Upload
              </button>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DynamicNFTPanel;
