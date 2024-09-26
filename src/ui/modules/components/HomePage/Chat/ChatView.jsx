import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbDownIcon as HandThumbDownIconActive,
  HandThumbUpIcon as HandThumbUpIconActive,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline"; // Import the copy icon
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import welcomeImage from "@/ui/assets/welcomeIcon.svg";
function ChatView({
  conversationHistory: initialConversationHistory,
  currentSessionId,
}) {
  const messagesEndRef = useRef(null);
  const [conversationHistory, setConversationHistory] = useState(
    initialConversationHistory,
  );
  const [copiedMessageIndex, setCopiedMessageIndex] = useState(null); // Store index of copied message

  useEffect(() => {
    setConversationHistory(initialConversationHistory);
  }, [initialConversationHistory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationHistory]);

  const handleLikeDislike = (index, liked) => {
    fetch("http://localhost:8000/api/like-dislike/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: currentSessionId,
        message_index: index,
        liked: liked,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setConversationHistory((prevHistory) =>
            prevHistory.map((message, i) =>
              i === index
                ? {
                    ...message,
                    liked: liked, // Update the liked status of the message
                  }
                : message,
            ),
          );
        } else {
          alert("Error updating like/dislike status.");
        }
      })
      .catch((error) => {
        console.error("Error updating like/dislike:", error);
        alert("Error updating like/dislike status.");
      });
  };

  const handleCopy = (content, index) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedMessageIndex(index); // Set the index of the copied message
      setTimeout(() => setCopiedMessageIndex(null), 2000); // Revert the icon after 2 seconds
    });
  };

  return (
    <div className="relative mb-[80px] flex w-full max-w-5xl flex-1 flex-col gap-y-[20px] overflow-y-auto p-4">
      {conversationHistory.length < 1 && (
        <div className="flex w-full flex-col items-center justify-center gap-y-[16px]">
          <div className="h-[64px] w-[64px] rounded-[20px] bg-black-light p-3">
            <Image
              loading={"lazy"}
              src={welcomeImage}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-x-[8px] text-center">
            <p className="w-full text-3xl font-bold text-black opacity-80">
              Hi, Can I help you with anything?
            </p>
            <p className="w-[75%] text-sm text-black opacity-40">
              You will get more accurate information if your questions are about
              the text file you added.
            </p>
          </div>
        </div>
      )}
      {conversationHistory.map((message, index) => {
        const isHuman = message.type === "human";
        const isLoading = message.loading;
        return (
          <div
            key={message.id || index}
            className={`flex ${isHuman ? "justify-end" : "mb-2 justify-start"} relative`}
          >
            <div className={`max-w-2xl rounded-lg bg-white p-2 text-black `}>
              {isLoading ? (
                <div className="flex w-[90px] items-center justify-center rounded-[12px]">
                  <div className="loading">
                    <div className="dot dot--one"></div>
                    <div className="dot dot--two"></div>
                    <div className="dot dot--three"></div>
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    dangerouslySetInnerHTML={{ __html: message.content }}
                  ></div>
                </div>
              )}
            </div>
            {!isHuman && !isLoading && (
              <div className="absolute bottom-[-32px] mt-2 flex gap-x-[3px]">
                <button
                  disabled={message.liked === true}
                  className="hover flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] text-black-light hover:bg-opacity-85 hover:bg-custom-gradient hover:text-white"
                  onClick={() => handleLikeDislike(index, true)}
                >
                  {message.liked === true ? (
                    <HandThumbUpIconActive width={18} />
                  ) : (
                    <HandThumbUpIcon width={18} />
                  )}
                </button>
                <button
                  disabled={message.liked === false}
                  className="hover flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] text-black-light hover:bg-opacity-85 hover:bg-custom-gradient hover:text-white"
                  onClick={() => handleLikeDislike(index, false)}
                >
                  {message.liked === false ? (
                    <HandThumbDownIconActive width={18} />
                  ) : (
                    <HandThumbDownIcon width={18} />
                  )}
                </button>
                <button
                  className="hover flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[8px] text-black-light hover:bg-opacity-85 hover:bg-custom-gradient hover:text-white"
                  onClick={() => handleCopy(message.content, index)}
                >
                  {copiedMessageIndex === index ? (
                    <CheckIcon width={18} /> // Show check icon when copied
                  ) : (
                    <DocumentDuplicateIcon width={18} />
                  )}
                </button>
              </div>
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatView;
