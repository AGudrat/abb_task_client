import React from 'react';
import ChatView from './ChatView';
import ChatInput from './ChatInput';

function ChatContainer({
  conversationHistory,
  isSending,
  handleSendMessage,
  openFileUpload,
}) {
  return (
    <React.StrictMode>
      <ChatView conversationHistory={conversationHistory} />
      <ChatInput
        onSendMessage={handleSendMessage}
        isSending={isSending}
        openFileUpload={openFileUpload}
      />
    </React.StrictMode>
  );
}

export default ChatContainer;
