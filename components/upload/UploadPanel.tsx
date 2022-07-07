import { useState } from "react";
import { parse } from "papaparse";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import IAchievementModel from "../../models/IAchievementModel";

const UploadPanel = () => {
  const achievements = [
    {
      name: "Main NFT",
      type: 1,
      tokenId: 0,
    },
    {
      name: "Achievement Level 1",
      type: 2,
      tokenId: 0,
    },
    {
      name: "Achievement Level 2",
      type: 2,
      tokenId: 1,
    },
  ];

  const [highlighted, setHighlighted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [wrongFileType, setWrongFileType] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>();

  const handleAchievementChange = (index: number) => {
    setSelectedAchievement(index);
    setOpenMenu(false);
  };

  const handleFileDrop = (files: FileList | null) => {
    if (files) {
      const firstFile = files[0];
      if (firstFile.type === "application/vnd.ms-excel") {
        setWrongFileType(false);
        setFile(firstFile);
      } else {
        setWrongFileType(true);
      }
    }
  };

  const uploadFile = async (selectedAchievement: any) => {
    if (file) {
      setUploading(true);
      const text = await file.text();
      const data = parse(text, {
        header: true,
      });
      let achievementWhitelist: IAchievementModel[] = [];
      for (const element of data.data) {
        const preModel: any = element;
        if (preModel["What is your *Ethereum Public Key*?"]) {
          const modelletje: IAchievementModel = {
            address: preModel["What is your *Ethereum Public Key*?"],
            type: achievements[selectedAchievement].type,
            dateAchieved: Date.now(),
            name: achievements[selectedAchievement].name,
            tokenId: achievements[selectedAchievement].tokenId,
          };
          achievementWhitelist.push(modelletje);
        }
      }
      const res = await fetch("/api/uploadFile", {
        method: "POST",
        body: JSON.stringify(achievementWhitelist),
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        if (res.status === 200) {
          setUploading(false);
          setSuccess(true);
        } else {
          setUploading(false);
          setSuccess(false);
        }
      });
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
                  <button
                    className="active:text-white flex min-w-[250px] items-center justify-between rounded bg-brand-purple-heart
            px-6 py-2.5 text-xs uppercase leading-tight text-default-text shadow-md transition duration-300 hover:bg-brand-purple-heliotrope
          "
                    type="button"
                    onClick={() => setOpenMenu(!openMenu)}
                  >
                    {achievements[selectedAchievement].name}

                    {!openMenu && <MdExpandMore size={25} />}
                    {openMenu && <MdExpandLess size={25} />}
                  </button>
                  {openMenu && (
                    <ul className="absolute z-50 mt-1 w-full cursor-pointer list-none rounded-lg border-none bg-white-300 bg-clip-padding py-2 text-left text-base shadow-lg">
                      {achievements.map((achievement, index) => (
                        <li
                          className="bg-transparent block w-full whitespace-nowrap py-2 px-4 text-sm font-normal text-gray-700 hover:bg-gray-100"
                          key={index}
                          onClick={() => handleAchievementChange(index)}
                        >
                          {index}: {achievement.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 space-y-2">
              {!file && (
                <>
                  <div
                    className={`group flex h-60 w-full flex-col rounded-lg border-4 border-dashed p-10 text-center transition duration-300 hover:cursor-pointer ${
                      highlighted
                        ? "border-action-valid/70 bg-brand-blue-mint/20 "
                        : ""
                    }`}
                    onDragEnter={() => setHighlighted(true)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setHighlighted(true);
                    }}
                    onDragLeave={() => setHighlighted(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setHighlighted(false);
                      handleFileDrop(e.dataTransfer.files);
                    }}
                  >
                    <div
                      className={`relative flex h-full w-full flex-col items-center justify-center text-center text-sm transition duration-300 group-hover:text-brand-blue-mint ${
                        highlighted ? "text-action-valid " : ""
                      }`}
                    >
                      <p> Click to upload or drag and drop</p>
                      <br />
                      <p
                        className={`${
                          wrongFileType ? "text-action-error" : ""
                        }`}
                      >
                        Only CSV allowed
                      </p>
                      <input
                        onChange={(e) => handleFileDrop(e.target.files)}
                        id="file-upload"
                        type="file"
                        className="absolute h-full w-full cursor-pointer opacity-0"
                        accept=".csv"
                      />
                    </div>
                  </div>
                </>
              )}
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
              <button
                onClick={() => uploadFile(selectedAchievement)}
                className={`${
                  file ? "" : "hidden"
                } my-5 flex w-full cursor-pointer justify-center rounded bg-brand-purple-heart p-4 text-lg text-default-text transition duration-300 hover:bg-brand-purple-portage`}
              >
                Upload
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default UploadPanel;
