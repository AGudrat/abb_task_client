// sessions.service.js
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

// Function to fetch all sessions
export const getSessions = () => {
  return axios.get(`${baseUrl}sessions/`);
};

// Function to fetch conversation history for a specific session
export const getConversationHistory = (sessionId) => {
  return axios.get(`${baseUrl}sessions/${sessionId}/`);
};

// Function to delete a session
export const deleteSession = (sessionId) => {
  return axios.delete(`${baseUrl}sessions/${sessionId}/`);
};

// Function to send a message
export const sendMessage = (sessionId, messageContent) => {
  return axios.post(`${baseUrl}ask/`, {
    session_id: sessionId,
    question: messageContent,
  });
};
