import React from "react";
import {
  ChatBubbleLeftEllipsisIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

function SessionButton({
  session,
  isActive,
  isOpen,
  onSessionSelect,
  onDeleteSession,
}) {
  return (
    <div
      key={session.session_id}
      className={`group relative flex ${
        isOpen
          ? "h-[54px] w-full"
          : "h-[54px] w-[54px] items-center justify-center"
      }`}
    >
      <button
        onClick={() => onSessionSelect(session.session_id)}
        className={`flex items-center ${
          isOpen
            ? "justify-left w-full gap-x-[8px] overflow-hidden px-4 py-[8px]"
            : "h-full w-full justify-center"
        } rounded-full text-white ${
          isActive ? "bg-custom-gradient" : "hover:bg-custom-gradient"
        }`}
      >
        <ChatBubbleLeftEllipsisIcon width={isOpen ? 18 : 20} />
        {isOpen && (
          <div className="flex flex-col items-start">
            <p className="line-clamp-1 text-start text-base">
              {session.conversation_history.length > 0
                ? session.conversation_history[0].data.content
                : "New Chat"}
            </p>
            <p className="text-xs">
              {session.created_at.split("T")[0]}{" "}
              {session.created_at.substring(0, 19).split("T")[1]}
            </p>
          </div>
        )}
      </button>
      {isOpen && (
        <button
          onClick={() => onDeleteSession(session.session_id)}
          className="absolute right-2 top-1/2 -translate-y-1/2 transform text-red-500 opacity-0 hover:text-red-700 group-hover:opacity-100"
        >
          <TrashIcon width={18} />
        </button>
      )}
    </div>
  );
}

export default SessionButton;
