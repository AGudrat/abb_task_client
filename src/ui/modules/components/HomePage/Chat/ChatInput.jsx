import React, { useState } from "react";
import {
  ArrowUpOnSquareIcon,
  ArrowUpRightIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";

function ChatInput({ onSendMessage, isSending, openFileUpload }) {
  const [messageContent, setMessageContent] = useState("");

  const handleSend = () => {
    if (messageContent.trim() === "") return;
    onSendMessage(messageContent);
    setMessageContent("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <div className="absolute bottom-0 left-0 flex w-full items-center justify-center px-[32px] pb-[16px] pt-[4px]">
        <div className="flex drop-shadow-2xl shadow-black-light h-[50px] w-full max-w-5xl flex-row items-center justify-center rounded-full bg-white p-[4px]">
          {" "}
          <div
            onClick={openFileUpload}
            className="flex h-full w-[46px] cursor-pointer items-center justify-center rounded-full bg-[#eae8e8] p-1 text-black-light "
          >
            <PaperClipIcon width={24} />
          </div>
          <input
            placeholder="Start typing"
            className=" h-full w-full rounded-[10px] px-[16px] py-[4px] text-black outline-none"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSending} // Disable input if sending
          />
          <button
            onClick={handleSend}
            className="flex h-full flex-row items-center justify-center rounded-full bg-[#e9947f] gap-x-[8px] px-[16px] text-white"
            disabled={isSending} // Disable button if sending
          >
            <p>Send</p>
            <ArrowUpRightIcon width={16} />
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatInput;
