import { useEffect, useState } from "react";
import { useSignMessage } from "wagmi";
import crypto from "crypto";
import DropdownButton from "../util/DropdownButton";
import DropdownItems from "../util/DropdownItems";
import FileInputArea from "../util/FileInputArea";
import SignMessageButton from "../util/SignMessageButton";
import { uploadFile, whitelistFromFile } from "../../api/uploadFile";

const UploadPanel = ({ achievementTypes }: any) => {
  const [saltHash, setSaltHash] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>();

  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: saltHash,
  });

  useEffect(() => {
    if (!data) {
      setSaltHash(crypto.randomBytes(16).toString("base64"));
    }
  }, [data]);

  const handleItemChange = (index: number) => {
    setSelectedAchievement(index);
    setOpenMenu(false);
  };

  const upload = async (selectedAchievement: any) => {
    if (file) {
      setUploading(true);
      const achievementWhitelist = await whitelistFromFile(
        file,
        achievementTypes,
        selectedAchievement
      );
      const res = await uploadFile(achievementWhitelist, saltHash, data!);
      if (res.success) {
        setUploading(false);
        setSuccess(true);
      } else {
        setUploading(false);
        setSuccess(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 text-brand-purple-portage sm:px-6 lg:px-8">
      <div className="z-10 flex w-full min-w-[500px] flex-col gap-5 rounded-xl bg-gray-900 p-10 sm:max-w-lg">
        {success && (
          <div className="flex justify-center text-xl text-action-valid">
            Successfully Uploaded 🎉
          </div>
        )}
        {!success && (
          <>
            {uploading && <h1 className="text-4xl"> UPLOADING</h1>}
            <h1 className="text-4xl"> File Upload</h1>
            <div className="flex justify-center">
              <div>
                <div className="dropdown relative ">
                  <h1 className="mb-2 text-base"> Select achievement below</h1>
                  <DropdownButton
                    setOpenMenu={setOpenMenu}
                    openMenu={openMenu}
                    text={achievementTypes[selectedAchievement].name}
                  />
                  {openMenu && (
                    <DropdownItems
                      items={achievementTypes}
                      handleItemChange={handleItemChange}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 space-y-2">
              {!file && <FileInputArea setFile={setFile} />}
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
            </div>

            <div>
              {!data && file && <SignMessageButton signMessage={signMessage} />}
              {data && (
                <button
                  onClick={() => upload(selectedAchievement)}
                  className={`${
                    file ? "" : "hidden"
                  } my-5 flex w-full cursor-pointer justify-center rounded bg-brand-purple-heart p-4 text-lg text-default-text transition duration-300 hover:bg-brand-purple-portage`}
                >
                  Upload
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadPanel;
