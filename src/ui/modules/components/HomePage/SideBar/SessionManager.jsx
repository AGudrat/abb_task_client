import React from 'react';
import SideBar from './SideBar';

function SessionManager({
  sessions,
  onSessionSelect,
  isSidebarOpen,
  onDeleteSession,
  currentSessionId,
}) {
  return (
    <SideBar
      sessions={sessions}
      onSessionSelect={onSessionSelect}
      isOpen={isSidebarOpen}
      onDeleteSession={onDeleteSession}
      currentSessionId={currentSessionId}
    />
  );
}

export default SessionManager;
