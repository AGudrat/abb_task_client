import React, { useState } from "react";

import Header from "./Header";
import FileDropZone from "./FileDropZone";
import UploadProgressBar from "./UploadProgressBar";
import { uploadTxtFile } from "@/services/chat.service";

const FileUpload = ({ onClose, triggerPopper, onUploadSuccess }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState("");
  const [fileName, setFileName] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (file) => {
    if (file && file.name.endsWith(".txt")) {
      setErrorMessage("");
      setFileName(file.name);
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

  return (
    <div className="fixed left-0 z-40 flex h-screen w-screen items-center justify-center">
      <div
        onClick={onClose}
        className="fixed z-10 h-full w-full bg-[black] opacity-50"
      ></div>
      <div
        className={`z-20 flex w-[500px] flex-col gap-y-[16px] rounded-[10px] bg-white py-[16px] text-center transition-all ${isLoading ? "h-[450px]" : "h-[350px]"}`}
      >
        <Header onClose={onClose} />
        <div className="flex flex-col px-[16px]">
          <FileDropZone
            handleFileChange={handleFileChange}
            isDragOver={isDragOver}
            setIsDragOver={setIsDragOver}
            isLoading={isLoading}
          />
        </div>

        {isLoading && (
          <UploadProgressBar
            uploadProgress={uploadProgress}
            remainingTime={remainingTime}
            fileName={fileName}
          />
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default FileUpload;
