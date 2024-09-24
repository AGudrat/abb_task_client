import React from "react";
import { ChatBubbleLeftEllipsisIcon, TrashIcon } from "@heroicons/react/24/outline";

function SessionButton({ session, isActive, isOpen, onSessionSelect, onDeleteSession }) {
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
        className={`flex ${
          isOpen
            ? "justify-left w-full items-center gap-x-[4px] px-4"
            : "h-full w-full justify-center"
        } rounded-full text-white ${
          isActive ? "bg-custom-gradient" : "hover:bg-custom-gradient"
        }`}
      >
        <ChatBubbleLeftEllipsisIcon width={isOpen ? 18 : 20} />
        {isOpen && (
          <p className="line-clamp-1 text-base">
            {session.conversation_history.length > 0
              ? session.conversation_history[0].data.content
              : session.created_at.substring(0, 19)}
          </p>
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
