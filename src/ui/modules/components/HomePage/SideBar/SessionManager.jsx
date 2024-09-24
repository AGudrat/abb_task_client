"use client";

import React from "react";
import SessionGroup from "./SessionGroup";
import groupSessionsByDate from "@/ui/modules/utils/groupSessionsByDate";

function SessionManager({
  isOpen = true,
  sessions,
  onSessionSelect,
  onDeleteSession,
  currentSessionId,
}) {
  const groupedSessions = groupSessionsByDate(sessions);

  return (
    <div className="mt-4 flex flex-col items-center gap-y-[8px] overflow-y-auto">
      {/* Today */}
      {groupedSessions.today.length > 0 && (
        <SessionGroup
          label="TODAY"
          sessions={groupedSessions.today}
          isOpen={isOpen}
          currentSessionId={currentSessionId}
          onSessionSelect={onSessionSelect}
          onDeleteSession={onDeleteSession}
        />
      )}

      {/* Yesterday */}
      {groupedSessions.yesterday.length > 0 && (
        <SessionGroup
          label="YESTERDAY"
          sessions={groupedSessions.yesterday}
          isOpen={isOpen}
          currentSessionId={currentSessionId}
          onSessionSelect={onSessionSelect}
          onDeleteSession={onDeleteSession}
        />
      )}

      {/* Past 7 Days */}
      {groupedSessions.past7Days.length > 0 && (
        <SessionGroup
          label="PAST 7 DAYS"
          sessions={groupedSessions.past7Days}
          isOpen={isOpen}
          currentSessionId={currentSessionId}
          onSessionSelect={onSessionSelect}
          onDeleteSession={onDeleteSession}
        />
      )}

      {/* Past 30 Days */}
      {groupedSessions.past30Days.length > 0 && (
        <SessionGroup
          label="PREVIOUS 30 DAYS"
          sessions={groupedSessions.past30Days}
          isOpen={isOpen}
          currentSessionId={currentSessionId}
          onSessionSelect={onSessionSelect}
          onDeleteSession={onDeleteSession}
        />
      )}
    </div>
  );
}

export default SessionManager;
