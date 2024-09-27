const UploadProgressBar = ({ uploadProgress, remainingTime, fileName }) => {
    return (
      <div className="flex flex-col px-[16px]">
        <div className="flex items-center justify-between">
          <p>Importing...</p>
        </div>
        <div className="mt-2 flex w-full justify-between text-xs">
          <div className="flex gap-4">
            <p>{uploadProgress}%</p>
            <p>{remainingTime}</p>
          </div>
          <p className="ml-auto">{fileName}</p>
        </div>
        <div className="bg-gray-200 mt-1 h-1 w-full">
          <div
            className="h-2 rounded-full bg-black"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      </div>
    );
  };
  
  export default UploadProgressBar;
  