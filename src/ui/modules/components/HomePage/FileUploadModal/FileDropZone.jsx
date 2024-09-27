import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const FileDropZone = ({ handleFileChange, isDragOver, setIsDragOver, isLoading }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  return (
    <div
      style={{ borderWidth: "2px" }}
      className={`relative flex h-[250px] w-full items-center justify-center rounded-[10px] border border-dashed border-black-light border-opacity-25 transition-colors ${
        isDragOver
          ? "border-black-light bg-black-light text-white"
          : "hover:border-black-light hover:border-opacity-0 hover:bg-black-light hover:bg-opacity-80 hover:text-white"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        style={{ display: "none" }}
        onChange={(event) => handleFileChange(event.target.files[0])}
        disabled={isLoading}
        accept=".txt"
      />
      <label
        htmlFor="file-upload"
        style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
        className="flex h-full w-full flex-col items-center justify-center"
      >
        <ArrowUpTrayIcon width={36} />
        <p className="mt-2">
          Select a file to upload <br /> or drag and drop it here
        </p>
      </label>
    </div>
  );
};

export default FileDropZone;
