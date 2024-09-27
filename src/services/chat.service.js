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
        (progressEvent.loaded * 100) / progressEvent.total,
      );
      onUploadProgress(progress);
    },
    cancelToken: cancelToken,
  });
};

export const sendLikeDislike = async (sessionId, messageIndex, liked) => {
  const response = await fetch(baseUrl + "like-dislike/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id: sessionId,
      message_index: messageIndex,
      liked: liked,
    }),
  });

  if (!response.ok) {
    throw new Error("Error updating like/dislike status.");
  }
};
