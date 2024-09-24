"use client";

import {
  ChatBubbleLeftEllipsisIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import dayjs from "dayjs"; // Import dayjs for date manipulation
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

// Helper function to group sessions by date
function groupSessionsByDate(sessions) {
  const grouped = {
    today: [],
    yesterday: [],
    past7Days: [],
    past30Days: [],
  };

  const now = dayjs().tz("Asia/Baku"); // Adjust for UTC+4

  sessions.forEach((session) => {
    const sessionDate = dayjs(session.created_at).tz("Asia/Baku");
    const diffDays = now.diff(sessionDate, "day");

    if (diffDays === 0) {
      grouped.today.push(session);
    } else if (diffDays === 1) {
      grouped.yesterday.push(session);
    } else if (diffDays <= 7) {
      grouped.past7Days.push(session);
    } else {
      grouped.past30Days.push(session);
    }
  });

  return grouped;
}

// Centralized session rendering function
function renderSessionButton(
  session,
  isActive,
  isOpen,
  onSessionSelect,
  onDeleteSession,
) {
  return (
    <div
      key={session.session_id}
      className={`group relative flex ${isOpen ? "h-[54px] w-full" : "h-[54px] w-[54px] items-center justify-center"}`}
    >
      <button
        onClick={() => onSessionSelect(session.session_id)}
        className={`flex ${isOpen ? "justify-left w-full items-center gap-x-[4px] px-4" : "h-full w-full justify-center"} rounded-full text-white ${isActive ? "bg-custom-gradient" : "hover:bg-custom-gradient"}`}
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

function SideBar({
  isOpen = true,
  sessions,
  onSessionSelect,
  onDeleteSession,
  currentSessionId,
}) {
  const groupedSessions = groupSessionsByDate(sessions);

  return (
    <>
      <div
        className={`pl-[16px] ${
          isOpen ? "w-[280px] px-2" : "w-[80px] max-w-[150px]"
        } z-20 flex h-screen flex-col py-4 transition-all duration-150`}
      >
        {/* List of sessions */}
        <div className="mt-4 flex flex-col items-center gap-y-[8px] overflow-y-auto">
          {/* Today */}
          {groupedSessions.today.length > 0 && (
            <div className="flex w-full flex-col gap-y-[4px]">
              {isOpen && <p className="pl-1 text-white">TODAY</p>}
              {groupedSessions.today.map((session) =>
                renderSessionButton(
                  session,
                  session.session_id === currentSessionId,
                  isOpen,
                  onSessionSelect,
                  onDeleteSession,
                ),
              )}
            </div>
          )}

          {/* Yesterday */}
          {groupedSessions.yesterday.length > 0 && (
            <div className="flex w-full flex-col gap-y-[4px]">
              {isOpen ? (
                <p className="line-clamp-1  pl-1 text-white">YESTERDAY</p>
              ) : (
                <div className="my-[8px] h-[1px] w-full bg-white opacity-30"></div>
              )}
              {groupedSessions.yesterday.map((session) =>
                renderSessionButton(
                  session,
                  session.session_id === currentSessionId,
                  isOpen,
                  onSessionSelect,
                  onDeleteSession,
                ),
              )}
            </div>
          )}

          {/* Past 7 Days */}
          {groupedSessions.past7Days.length > 0 && (
            <div className="flex w-full flex-col gap-y-[4px]">
              {isOpen && (
                <p className="line-clamp-1  pl-1 text-white">PAST 7 DAYS</p>
              )}
              {groupedSessions.past7Days.map((session) =>
                renderSessionButton(
                  session,
                  session.session_id === currentSessionId,
                  isOpen,
                  onSessionSelect,
                  onDeleteSession,
                ),
              )}
            </div>
          )}

          {/* Past 30 Days */}
          {groupedSessions.past30Days.length > 0 && (
            <div className="flex w-full flex-col gap-y-[4px]">
              {isOpen ? (
                <p className="line-clamp-1 pl-1 text-white">PREVIOUS 30 DAYS</p>
              ) : (
                <div className="my-[8px] h-[1px] w-full bg-white opacity-30"></div>
              )}
              {groupedSessions.past30Days.map((session) =>
                renderSessionButton(
                  session,
                  session.session_id === currentSessionId,
                  isOpen,
                  onSessionSelect,
                  onDeleteSession,
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SideBar;
