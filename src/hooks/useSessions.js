import { useState, useEffect } from "react";
import { getSessions, deleteSession } from "@/services/sessions.service";

export const useSessions = (initialSessionId = null, triggerPopper) => {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(initialSessionId);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);
  const [isScraperModalOpen, setIsScraperModalOpen] = useState(false);

  // Fetch sessions on component mount
  useEffect(() => {
    fetchSessions();
  }, []);

  // Fetch sessions function using Axios
  const fetchSessions = () => {
    getSessions()
      .then((response) => {
        const data = response.data;
        // Sort sessions by created_at date in descending order
        const sortedSessions = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );

        setSessions(sortedSessions);

        if (sortedSessions.length > 0) {
          // Set the current session to the most recent one
          const latestSession = sortedSessions[0];
          setCurrentSessionId(latestSession.session_id);
          setIsFileUploadOpen(false); // Close the file upload modal
        } else {
          // If no sessions, keep the file upload modal open
          setIsFileUploadOpen(true);
        }
      })
      .catch((error) => console.error("Error fetching sessions:", error));
  };

  // Handle session selection
  const handleSessionSelect = (sessionId) => {
    setCurrentSessionId(sessionId);
  };

  // Handle session deletion using Axios
  const handleDeleteSession = (sessionId) => {
    deleteSession(sessionId)
      .then((response) => {
        if (response.status === 204) {
          // Remove the session from the list
          setSessions((prevSessions) => {
            const updatedSessions = prevSessions.filter(
              (session) => session.session_id !== sessionId,
            );
            return updatedSessions;
          });

          // If the deleted session was the current one
          if (currentSessionId === sessionId) {
            if (sessions.length > 1) {
              // Set current session to the next available session
              const nextSession = sessions.find(
                (session) => session.session_id !== sessionId,
              );
              setCurrentSessionId(nextSession.session_id);
            } else {
              // No sessions left, open the file upload modal
              setCurrentSessionId(null);
              setIsFileUploadOpen(true);
            }
          }
        } else {
          console.error("Failed to delete session");
        }
      })
      .catch((error) => console.error("Error deleting session:", error));
  };

  // Handle upload success
  const handleUploadSuccess = (newSessionData) => {
    const newSession = {
      session_id: newSessionData.session_id,
      conversation_history: newSessionData.conversation_history || [],
      created_at: newSessionData.created_at,
    };

    // Update the sessions list and sort
    setSessions((prevSessions) => {
      const updatedSessions = [newSession, ...prevSessions];
      updatedSessions.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
      return updatedSessions;
    });

    // Set the current session to the new one
    setCurrentSessionId(newSession.session_id);

    // Close the file upload modal
    setIsFileUploadOpen(false);
  };
  const toggleScraperModal = () => {
    setIsScraperModalOpen((prev) => !prev);
  };
  // Close FileUpload modal
  const closeFileUpload = () => {
    if (sessions.length > 0) {
      // If sessions exist, set current session to the most recent one
      const latestSession = sessions[0]; // Sessions are sorted
      setCurrentSessionId(latestSession.session_id);
      setIsFileUploadOpen(false);
    } else {
      // If no sessions, reopen the modal and show error popper
      setIsFileUploadOpen(true);
      if (triggerPopper) {
        triggerPopper("No sessions available. Please upload a file.", "error");
      }
    }
  };

  // Open FileUpload modal
  const openFileUpload = () => {
    setIsFileUploadOpen(true);
  };

  return {
    sessions,
    currentSessionId,
    isFileUploadOpen,
    isScraperModalOpen,
    toggleScraperModal,
    handleSessionSelect,
    handleDeleteSession,
    handleUploadSuccess,
    closeFileUpload,
    openFileUpload,
    setSessions, // Expose setSessions for updates
    setIsFileUploadOpen, // Expose setter if needed
  };
};
