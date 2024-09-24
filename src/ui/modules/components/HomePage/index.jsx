"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Popper from "@/ui/modules/utils/Popper";
import { useSessions } from "@/hooks/useSessions";
import { useConversation } from "@/hooks/useConversation";
import Header from "../../blocks/Header";
import ChatContainer from "./Chat/ChatContainer";
import SideBar from "./SideBar/index";

const FileUpload = dynamic(
  () => import("@/ui/modules/components/HomePage/FileUpload"),
  {
    loading: () => <></>,
  },
);

export default function HomePage() {
  // State variables
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [popperMessage, setPopperMessage] = useState("");
  const [popperType, setPopperType] = useState("");
  const [isPopperVisible, setIsPopperVisible] = useState(false);
  // Trigger the popper
  const triggerPopper = (message, type) => {
    setPopperMessage(message);
    setPopperType(type);
    setIsPopperVisible(true);

    // Hide the popper after a duration
    setTimeout(() => {
      setIsPopperVisible(false);
    }, 3000); // Duration of 3 seconds
  };

  // Use custom hooks
  const {
    sessions,
    currentSessionId,
    isFileUploadOpen,
    handleSessionSelect,
    handleDeleteSession,
    handleUploadSuccess,
    closeFileUpload,
    openFileUpload,
  } = useSessions(null, triggerPopper);

  const { conversationHistory, isSending, handleSendMessage } = useConversation(
    currentSessionId,
    triggerPopper,
  );

  // Toggle sidebar
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <React.StrictMode>
      <SideBar
        sessions={sessions}
        onSessionSelect={handleSessionSelect}
        isSidebarOpen={isSidebarOpen}
        onDeleteSession={handleDeleteSession}
        currentSessionId={currentSessionId}
        handleSidebarToggle={handleSidebarToggle}
      />
      {isFileUploadOpen && (
        <FileUpload
          onClose={closeFileUpload}
          triggerPopper={triggerPopper}
          onUploadSuccess={handleUploadSuccess}
        />
      )}
      <Popper
        message={popperMessage}
        type={popperType}
        isVisible={isPopperVisible}
      />
      <div
        className={`chat-view relative my-[16px] mr-[32px] w-full flex-1 flex-col items-center justify-center gap-y-[16px] overflow-hidden rounded-[10px] bg-gradient-to-br from-[#fdf6f3] via-[#f4e1e9] to-[#e5e9f3] max-sm:h-full max-sm:w-full 
        sm:flex ${isSidebarOpen ? "max-sm:hidden" : "max-sm:h-screen-minus-32 flex max-sm:col-span-12"}`}
      >
        <Header
          handleSidebarToggle={handleSidebarToggle}
          openFileUpload={openFileUpload}
        />
        <ChatContainer
          conversationHistory={conversationHistory}
          isSending={isSending}
          handleSendMessage={handleSendMessage}
          openFileUpload={openFileUpload}
        />
      </div>
    </React.StrictMode>
  );
}
