import { useState, useEffect } from "react";
import {
  getConversationHistory,
  sendMessage,
} from "@/services/sessions.service";
import { v4 as uuidv4 } from "uuid";

export const useConversation = (currentSessionId, triggerPopper) => {
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isSending, setIsSending] = useState(false);

  // Fetch conversation history when currentSessionId changes
  useEffect(() => {
    if (currentSessionId) {
      fetchConversationHistory(currentSessionId);
    } else {
      setConversationHistory([]);
    }
  }, [currentSessionId]);

  // Fetch conversation history function using Axios
  const fetchConversationHistory = (sessionId) => {
    getConversationHistory(sessionId)
      .then((response) => {
        setConversationHistory(response.data.conversation_history);
      })
      .catch((error) => {
        console.error("Error fetching conversation history:", error);
        triggerPopper("Error fetching conversation history:", "error");
      });
  };

  // Handle sending a message using Axios
  const handleSendMessage = (messageContent) => {
    if (!currentSessionId) {
      console.error("No session selected");
      triggerPopper("No session selected", "error");
      return;
    }

    const humanMessageId = uuidv4();
    const aiMessageId = uuidv4();

    const humanMessage = {
      id: humanMessageId,
      type: "human",
      content: messageContent,
      loading: false,
    };

    const aiMessagePlaceholder = {
      id: aiMessageId,
      type: "ai",
      content: "",
      loading: true,
    };

    // Optimistically update the conversation history with the human message
    setConversationHistory((prevHistory) => [
      ...prevHistory,
      humanMessage,
      aiMessagePlaceholder,
    ]);

    setIsSending(true);

    // Send the message to the server
    sendMessage(currentSessionId, messageContent)
      .then((response) => {
        const aiMessageContent = response.data.answer;

        // Replace the AI message placeholder with the actual message
        setConversationHistory((prevHistory) =>
          prevHistory.map((message) =>
            message.id === aiMessageId
              ? { ...message, content: aiMessageContent, loading: false }
              : message,
          ),
        );
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        // Update the placeholder with an error message
        setConversationHistory((prevHistory) =>
          prevHistory.map((message) =>
            message.id === aiMessageId
              ? {
                  ...message,
                  content: "Error: Could not get response from server.",
                  loading: false,
                }
              : message,
          ),
        );
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return {
    conversationHistory,
    isSending,
    handleSendMessage,
    setConversationHistory, // Expose setter if needed
  };
};
