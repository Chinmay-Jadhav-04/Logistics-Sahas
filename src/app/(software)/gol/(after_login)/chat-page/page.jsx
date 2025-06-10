'use client';

import React, { useEffect, useState } from 'react';
import { useSidebar } from '@/contexts/SidebarProvider';
import Messages from './components/messages';
import ChatPopupScreen from './components/chatpopupscreen';
import AddNewConversation from './components/AddNewConversation';
import MobileView from './components/MobileView';

const ChatPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [showAddConversation, setShowAddConversation] = useState(false);
  const [currentView, setCurrentView] = useState('messages'); // 'messages' or 'chat'
  const [isMobile, setIsMobile] = useState(false);
  const { setTitle } = useSidebar();

  useEffect(() => {
    setTitle('Chat Page');
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [setTitle]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setCurrentView('chat');
    }
  };

  const handleBackToMessages = () => {
    setCurrentView('messages');
    setSelectedConversation(null);
  };

  const handleAddConversation = (newConversation) => {
    setConversations(prev => [newConversation, ...prev]);
  };

  if (isMobile) {
    return (
      <MobileView 
        currentView={currentView}
        onBackToMessages={handleBackToMessages}
        conversation={selectedConversation}
      >
        {currentView === 'messages' ? (
          <Messages 
            onSelectConversation={handleSelectConversation}
            selectedConversation={selectedConversation}
            conversations={conversations}
            onShowAddConversation={() => setShowAddConversation(true)}
          />
        ) : (
          <ChatPopupScreen 
            conversation={selectedConversation}
            onClose={handleBackToMessages}
          />
        )}
        
        {showAddConversation && (
          <AddNewConversation
            isOpen={showAddConversation}
            onClose={() => setShowAddConversation(false)}
            onAddConversation={handleAddConversation}
          />
        )}
      </MobileView>
    );
  }

  return (
    <div className="flex bg-gray-100 h-full w-full">
      {/* Messages Sidebar */}
      <div className="w-80 bg-background border border-background">
        <Messages 
          onSelectConversation={handleSelectConversation}
          selectedConversation={selectedConversation}
          conversations={conversations}
          onShowAddConversation={() => setShowAddConversation(true)}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1">
        {selectedConversation ? (
          <ChatPopupScreen 
            conversation={selectedConversation}
            onClose={() => setSelectedConversation(null)}
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">GOL</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Welcome to GOL Chat
              </h3>
              <p className="text-gray-600">
                Select a conversation to start messaging
              </p>
            </div>
          </div>
        )}
      </div>

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