'use client';

import React, { useEffect, useState } from 'react';
import { useSidebar } from '@/contexts/SidebarProvider';
import Messages from './components/messages';
import ChatPopupScreen from './components/chatpopupscreen';
import AddNewConversation from './components/AddNewConversation';

const ChatPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [showAddConversation, setShowAddConversation] = useState(false);
  const [currentView, setCurrentView] = useState('messages'); // 'messages' or 'chat'
  const { setTitle } = useSidebar();

  useEffect(() => {
    setTitle('Chat Page');
  }, [setTitle]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setCurrentView('chat');
  };

  const handleBackToMessages = () => {
    setCurrentView('messages');
    setSelectedConversation(null);
  };

  const handleAddConversation = (newConversation) => {
    setConversations(prev => [newConversation, ...prev]);
  };

  return (
    <div className="h-full w-full">
      {currentView === 'messages' ? (
        <div className="h-full w-full">
          <Messages 
            onSelectConversation={handleSelectConversation}
            selectedConversation={selectedConversation}
            conversations={conversations}
            onShowAddConversation={() => setShowAddConversation(true)}
          />
        </div>
      ) : (
        <div className="h-full w-full">
          <ChatPopupScreen 
            conversation={selectedConversation}
            onClose={handleBackToMessages}
          />
        </div>
      )}

      {/* Add New Conversation Modal */}
      {showAddConversation && (
        <AddNewConversation
          isOpen={showAddConversation}
          onClose={() => setShowAddConversation(false)}
          onAddConversation={handleAddConversation}
        />
      )}
    </div>
  );
};

export default ChatPage;