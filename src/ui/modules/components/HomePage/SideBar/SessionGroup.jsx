import React from "react";
import SessionButton from "./SessionButton";

function SessionGroup({ label, sessions, isOpen, currentSessionId, onSessionSelect, onDeleteSession }) {
  return (
    <div className="flex w-full flex-col gap-y-[4px]">
      {isOpen && <p className="pl-1 text-white">{label}</p>}
      {sessions.map((session) => (
        <SessionButton
          key={session.session_id}
          session={session}
          isActive={session.session_id === currentSessionId}
          isOpen={isOpen}
          onSessionSelect={onSessionSelect}
          onDeleteSession={onDeleteSession}
        />
      ))}
    </div>
  );
}

export default SessionGroup;
