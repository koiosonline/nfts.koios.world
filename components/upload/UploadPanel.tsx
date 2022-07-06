const UploadPanel = () => {
  return (
    <div className="relative flex items-center justify-center py-12 px-4 text-brand-purple-portage sm:px-6 lg:px-8">
      <div className="z-10 w-full rounded-xl bg-gray-900 p-10 sm:max-w-lg">
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
              className="flex w-full items-center justify-center"
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                console.log(e.dataTransfer.files);
                //Array.from(e.dataTransfer.files).forEach((x) => x.select());
              }}
            >
              <label className="group flex h-60 w-full flex-col rounded-lg border-4 border-dashed p-10 text-center hover:cursor-pointer">
                <div className="flex h-full w-full flex-col items-center justify-center text-center  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 transition duration-300 group-hover:text-brand-blue-mint md:h-20 md:w-20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <div className="mx-auto -mt-10 flex max-h-48 w-2/5 flex-auto"></div>
                  <p className="pointer-none text-sm transition duration-300 group-hover:text-brand-blue-mint">
                    <span className="text-sm">Drag and drop</span> your file
                    here or click to select
                  </p>
                </div>
                <input type="file" className="hidden" accept=".csv" />
              </label>
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
