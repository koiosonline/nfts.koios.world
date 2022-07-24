import { useState } from "react";

const FileInputArea = ({ setFile }: any) => {
  const [highlighted, setHighlighted] = useState(false);
  const [wrongFileType, setWrongFileType] = useState(false);

  const handleValidation = (files: FileList | null) => {
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

  return (
    <>
      <div
        className={`group flex h-60 w-full flex-col rounded-lg border-4 border-dashed p-10 text-center transition duration-300 hover:cursor-pointer ${
          highlighted ? "border-action-valid/70 bg-brand-blue-mint/20 " : ""
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
          handleValidation(e.dataTransfer.files);
        }}
      >
        <div
          className={`relative flex h-full w-full flex-col items-center justify-center text-center text-sm transition duration-300 group-hover:text-brand-blue-mint ${
            highlighted ? "text-action-valid " : ""
          }`}
        >
          <p> Click to upload or drag and drop</p>
          <br />
          <p className={`${wrongFileType ? "text-action-error" : ""}`}>
            Only CSV allowed
          </p>
          <input
            onChange={(e) => handleValidation(e.target.files)}
            id="file-upload"
            type="file"
            className="absolute h-full w-full cursor-pointer opacity-0"
            accept=".csv"
          />
        </div>
      </div>
    </>
  );
};
export default FileInputArea;
