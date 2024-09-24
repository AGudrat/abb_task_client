import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

// Upload .txt file for new session
export const uploadTxtFile = (formData, onUploadProgress, cancelToken) => {
  return axios.post(baseUrl + "upload/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
      const progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onUploadProgress(progress);
    },
    cancelToken: cancelToken, 
  });
};
