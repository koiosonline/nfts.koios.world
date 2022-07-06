import { useState } from "react";
import { parse } from "papaparse";

const UploadPanel = () => {
  const [highlighted, setHighlighted] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleFileDrop = (files: FileList) => {
    Array.from(files)
      .filter((file) => file.type === "application/vnd.ms-excel")
      .forEach(async (file) => {
        setUploadedFileName(file.name);

        const text = await file.text();
        const result = parse(text, { header: true });
        //console.log(result.data[0]["What is your *Ethereum Public Key*?"]);
      });
  };

  return (
    <div className="relative flex items-center justify-center py-12 px-4 text-brand-purple-portage sm:px-6 lg:px-8">
      <div className="z-10 w-full min-w-[500px] rounded-xl bg-gray-900 p-10 sm:max-w-lg">
        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold">File Upload!</h2>
          <p className="text-gray-400 mt-2 text-sm">
            Upload your file for the achievements
          </p>
        </div>
        <form className="mt-8 space-y-3" action="#" method="POST">
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-gray-500 text-sm font-bold tracking-wide">
              Attach Document:
            </label>
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
                className={`flex h-full w-full flex-col items-center justify-center text-center text-sm transition duration-300 group-hover:text-brand-blue-mint ${
                  highlighted ? "text-action-valid " : ""
                }`}
              >
                {!uploadedFileName && (
                  <p> Drag and drop your file here or click to select</p>
                )}

                {uploadedFileName !== "" && <p>{uploadedFileName}</p>}
              </div>
              <input type="file" className="hidden" accept=".csv" />
            </div>
          </div>
          <p className="text-gray-300 text-sm">
            <span>Accepted file type: .csv</span>
          </p>
          <div>
            <button
              type="submit"
              className="focus:shadow-outline my-5 flex w-full cursor-pointer justify-center rounded-full bg-brand-purple-heart p-4 text-lg
                                    tracking-wide text-default-text shadow-lg transition duration-300 ease-in hover:bg-brand-purple-portage focus:outline-none"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UploadPanel;
