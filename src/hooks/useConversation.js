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
        const data = response.data;
        setConversationHistory(data.conversation_history);
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
      data: {
        id: humanMessageId,
        name: null,
        type: "human",
        content: messageContent,
        additional_kwargs: {},
        response_metadata: {},
      },
      type: "human",
    };
    // Optimistically add the human message
    setConversationHistory((prevHistory) => [...prevHistory, humanMessage]);
    const aiMessagePlaceholder = {
      id: aiMessageId,
      data: {
        id: aiMessageId,
        name: null,
        type: "ai",
        content: "", // content is empty for now
        additional_kwargs: {},
        response_metadata: {},
        loading: true, // add a loading flag
      },
      type: "ai",
    };
    setConversationHistory((prevHistory) => [
      ...prevHistory,
      aiMessagePlaceholder,
    ]);
    setIsSending(true);
    // Send the message to the server
    sendMessage(currentSessionId, messageContent)
      .then((response) => {
        const data = response.data;
        const aiMessageContent = data.answer;
        if (aiMessageContent) {
          // Update the placeholder with the actual AI message
          setConversationHistory((prevHistory) =>
            prevHistory.map((msg) =>
              msg.id === aiMessageId
                ? {
                    ...msg,
                    data: {
                      ...msg.data,
                      content: aiMessageContent,
                      loading: false,
                    },
                  }
                : msg,
            ),
          );
        } else {
          console.error("Invalid response from server:", data);
          triggerPopper("Invalid response from server:", "error");
          // Optionally, update the placeholder with an error message
          setConversationHistory((prevHistory) =>
            prevHistory.map((msg) =>
              msg.id === aiMessageId
                ? {
                    ...msg,
                    data: {
                      ...msg.data,
                      content: "Error: Invalid response from server.",
                      loading: false,
                    },
                  }
                : msg,
            ),
          );
        }
        setIsSending(false);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        // Update the placeholder with an error message
        setConversationHistory((prevHistory) =>
          prevHistory.map((msg) =>
            msg.id === aiMessageId
              ? {
                  ...msg,
                  data: {
                    ...msg.data,
                    content: "Error: Could not get response from server.",
                    loading: false,
                  },
                }
              : msg,
          ),
        );
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
