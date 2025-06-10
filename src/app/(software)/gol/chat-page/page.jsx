"use client";
import React, { useState, useEffect } from 'react';
import Messages from './components/messages';
import ChatPopupScreen from './components/chatpopupscreen';
import AddNewConversation from './components/AddNewConversation';
import MobileView from './components/MobileView';

const ChatPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showAddConversation, setShowAddConversation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileView, setMobileView] = useState('messages'); // 'messages' or 'chat'
  const [conversations, setConversations] = useState([]);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize conversations with mock data
  useEffect(() => {
    const initialConversations = [
      {
        id: 1,
        name: 'FX CFS',
        lastMessage: 'Haha oh man 🔥',
        time: '12m ago',
        unreadCount: 64,
        avatar: '/api/placeholder/40/40',
        isOnline: true
      },
      {
        id: 2,
        name: 'GNS CFS',
        lastMessage: "Haha that's terrifying 😱",
        time: '1h ago',
        unreadCount: 35,
        avatar: '/api/placeholder/40/40',
        isOnline: true
      },
      {
        id: 3,
        name: 'Sahas Logistic',
        lastMessage: 'omg, this is amazing',
        time: '5h ago',
        unreadCount: 20,
        avatar: '/api/placeholder/40/40',
        isOnline: false
      },
      {
        id: 4,
        name: 'Pratik NX CFS',
        lastMessage: 'love 😍',
        time: '2d ago',
        unreadCount: 15,
        avatar: '/api/placeholder/40/40',
        isOnline: false
      },
      {
        id: 5,
        name: 'Alfonzo Schuessler',
        lastMessage: 'perfect!',
        time: '1m ago',
        unreadCount: 17,
        avatar: '/api/placeholder/40/40',
        isOnline: true
      },
      {
        id: 6,
        name: 'Florencio Dorrance',
        lastMessage: 'woohoooo',
        time: '24min ago',
        unreadCount: 0,
        avatar: '/api/placeholder/40/40',
        isOnline: true
      },
      {
        id: 7,
        name: 'MumbaiCFS',
        lastMessage: 'Request for Job order',
        time: '5h ago',
        unreadCount: 8,
        avatar: '/api/placeholder/40/40',
        isOnline: false
      },
      {
        id: 8,
        name: 'TaraLogistics',
        lastMessage: 'went trip Gory',
        time: '5h ago',
        unreadCount: 6,
        avatar: '/api/placeholder/40/40',
        isOnline: false
      }
    ];
    setConversations(initialConversations);
  }, []);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setMobileView('chat');
    }
  };

  const handleBackToMessages = () => {
    setMobileView('messages');
    setSelectedConversation(null);
  };

  const handleAddConversation = (newConversation) => {
    setConversations(prev => [newConversation, ...prev]);
    setSelectedConversation(newConversation);
    if (isMobile) {
      setMobileView('chat');
    }
  };

  // Enhanced Messages component with + button functionality
  const MessagesWithAdd = ({ onSelectConversation, selectedConversation }) => {
    return (
      <div className="w-full h-full bg-gray-100 flex flex-col">
        {/* Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              {conversations.reduce((acc, conv) => acc + conv.unreadCount, 0)}
            </span>
          </div>
          <button 
            onClick={() => setShowAddConversation(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search messages"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation)}
              className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors ${
                selectedConversation?.id === conversation.id ? 'bg-green-50 border-l-4 border-l-green-500' : ''
              }`}
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" fill="%23e5e7eb"/><text x="24" y="28" text-anchor="middle" fill="%236b7280" font-family="Arial" font-size="16">${conversation.name.charAt(0)}</text></svg>`;
                    }}
                  />
                </div>
                {conversation.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900 truncate">
                    {conversation.name}
                  </h3>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {conversation.time}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {conversation.lastMessage}
                </p>
              </div>

              {/* Unread Badge */}
              {conversation.unreadCount > 0 && (
                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                  {conversation.unreadCount}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="h-screen bg-gray-100">
        <MobileView 
          currentView={mobileView}
          onBackToMessages={handleBackToMessages}
          conversation={selectedConversation}
        >
          {mobileView === 'messages' ? (
            <MessagesWithAdd 
              onSelectConversation={handleSelectConversation}
              selectedConversation={selectedConversation}
            />
          ) : (
            <ChatPopupScreen 
              conversation={selectedConversation}
              onClose={handleBackToMessages}
            />
          )}
        </MobileView>
        
        {/* Add New Conversation Modal */}
        <AddNewConversation
          isOpen={showAddConversation}
          onClose={() => setShowAddConversation(false)}
          onAddConversation={handleAddConversation}
        />
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Messages Sidebar */}
      <div className="w-80 border-r border-gray-200 bg-white">
        <MessagesWithAdd 
          onSelectConversation={handleSelectConversation}
          selectedConversation={selectedConversation}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <ChatPopupScreen 
            conversation={selectedConversation}
            onClose={() => setSelectedConversation(null)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Welcome to GOL SIDE Chat
              </h3>
              <p className="text-gray-500 mb-4">
                Select a conversation to start messaging or create a new one
              </p>
              <button
                onClick={() => setShowAddConversation(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Start New Conversation
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add New Conversation Modal */}
      <AddNewConversation
        isOpen={showAddConversation}
        onClose={() => setShowAddConversation(false)}
        onAddConversation={handleAddConversation}
      />
    </div>
  );
};

export default ChatPage;