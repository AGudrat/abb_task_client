import React, { useEffect, useRef, useState } from "react";
import welcomeImage from "@/ui/assets/welcomeIcon.svg";
import { handleCopy } from "@/ui/modules/utils/handleCopy";
import { sendLikeDislike } from "@/services/chat.service";
import ChatMessage from "./ChatMessage";
import EmptyState from "./EmptyState";

function ChatView({ conversationHistory: initialConversationHistory, currentSessionId }) {
  const messagesEndRef = useRef(null);
  const [conversationHistory, setConversationHistory] = useState(initialConversationHistory);
  const [copiedMessageIndex, setCopiedMessageIndex] = useState(null);

  useEffect(() => {
    setConversationHistory(initialConversationHistory);
  }, [initialConversationHistory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationHistory]);

  const handleLikeDislike = async (index, liked) => {
    try {
      await sendLikeDislike(currentSessionId, index, liked);
      setConversationHistory(prevHistory =>
        prevHistory.map((message, i) =>
          i === index ? { ...message, liked: liked } : message
        )
      );
    } catch (error) {
      alert("Error updating like/dislike status.");
    }
  };

  const handleCopyMessage = (content, index) => {
    handleCopy(content);
    setCopiedMessageIndex(index);
    setTimeout(() => setCopiedMessageIndex(null), 2000);
  };

  return (
    <div className="relative mb-[80px] flex w-full max-w-5xl flex-1 flex-col gap-y-[20px] overflow-y-auto p-4">
      {conversationHistory.length < 1 ? (
        <EmptyState welcomeImage={welcomeImage} />
      ) : (
        conversationHistory.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            index={index}
            copiedMessageIndex={copiedMessageIndex}
            handleLikeDislike={handleLikeDislike}
            handleCopyMessage={handleCopyMessage}
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatView;
