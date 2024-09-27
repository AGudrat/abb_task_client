import React, { useState } from "react";
import { uploadTxtFile } from "@/services/chat.service";
import {
  ArrowUpTrayIcon,
  XMarkIcon,
  PauseIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const FileUpload = ({ onClose, triggerPopper, onUploadSuccess }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  const [remainingTime, setRemainingTime] = useState(""); // Track estimated remaining time
  const [fileName, setFileName] = useState(""); // Store file name
  const [isDragOver, setIsDragOver] = useState(false); // Track if file is being dragged over the drop zone

  const handleFileChange = (file) => {
    if (file && file.name.endsWith(".txt")) {
      setErrorMessage("");
      setFileName(file.name); // Set file name for display
      sendFileToAPI(file);
    } else {
      setErrorMessage("Only .txt files can be uploaded.");
      triggerPopper("Only .txt files can be uploaded.", "error");
    }
  };

  const sendFileToAPI = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    setIsLoading(true);
    setUploadProgress(0); // Reset progress

    const startTime = Date.now(); // Capture the start time

    uploadTxtFile(formData, (progress) => {
      setUploadProgress(progress);

      // Calculate time passed
      const elapsedTime = (Date.now() - startTime) / 1000; // Time in seconds
      const estimatedTotalTime = (elapsedTime / progress) * 100; // Estimate total time based on current progress
      const remaining = estimatedTotalTime - elapsedTime;

      if (remaining > 0) {
        setRemainingTime(`${Math.round(remaining)} seconds remaining`);
      }
    })
      .then((response) => {
        triggerPopper("File uploaded successfully!", "success");
        setIsLoading(false);
        onUploadSuccess(response.data);
      })
      .catch((error) => {
        setErrorMessage("An error occurred while uploading the file.");
        triggerPopper("An error occurred while uploading the file.", "error");
        setIsLoading(false);
      });
  };

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
    <>
      <div className="fixed left-0 z-40 flex h-screen w-screen items-center justify-center">
        <div
          onClick={() => onClose()}
          className="fixed z-10 h-full w-full bg-[black] opacity-50"
        ></div>
        <div
          className={`z-20 flex w-[500px] flex-col gap-y-[16px] rounded-[10px] bg-white py-[16px] text-center transition-all ${isLoading ? "h-[450px]" : "h-[350px]"}`}
        >
          <div className="flex min-h-[32px] flex-row justify-between border-b border-b-black border-opacity-20 px-[16px] pb-[8px]">
            <div className="flex flex-row items-center gap-x-[8px]">
              <h2 className="text-2xl font-bold">Import text file</h2>
              <div className="group relative flex cursor-pointer">
                <InformationCircleIcon width={20} />
                <div className="absolute bottom-6 hidden min-w-[400px] rounded-[10px] bg-black bg-opacity-90 px-[16px] py-[4px] text-white group-hover:flex">
                  <p className="w-full">
                    After uploading the text file, a new session will open,
                    allowing you to ask questions within it.
                  </p>
                </div>
              </div>
            </div>
            <div
              onClick={() => onClose()}
              className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-[10px] border border-black border-opacity-60"
            >
              <XMarkIcon width={24} />
            </div>
          </div>
          <div className="flex flex-col px-[16px]">
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
          </div>
          {isLoading && (
            <div className="flex flex-col px-[16px]">
              {" "}
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
          )}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
