"use client";
import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';

const Messages = ({ onSelectConversation, selectedConversation, conversations }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Default mock data if no conversations passed
  const defaultConversations = [
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

  const conversationsList = conversations || defaultConversations;

  const filteredConversations = conversationsList.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-accent flex flex-col">
      {/* Header */}
      <div className="bg-background px-4 py-3 border-b border-green-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">Messages</h2>
          <span className="bg-light-primary text-white text-xs px-2 py-1 rounded-full">
            {conversationsList.reduce((acc, conv) => acc + conv.unreadCount, 0)}
          </span>
        </div>
        <button className="p-2 hover:bg-accent rounded-full transition-colors">
          <Plus className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Search */}
      <div className="p-4 bg-background border-b border-green
      -200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-4 h-4" />
          <input
            type="text"
            placeholder="Search messages"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-accent rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-light-primary focus:border-transparent text-foreground placeholder:text-secondary"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto bg-accent">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`flex items-center gap-3 p-4 hover:bg-white/70 cursor-pointer border-b border-white/30 transition-colors ${
              selectedConversation?.id === conversation.id ? 'bg-white border-l-4 border-l-light-primary shadow-sm' : ''
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
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-light-primary rounded-full border-2 border-white"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-foreground truncate">
                  {conversation.name}
                </h3>
                <span className="text-xs text-secondary flex-shrink-0">
                  {conversation.time}
                </span>
              </div>
              <p className="text-sm text-secondary truncate">
                {conversation.lastMessage}
              </p>
            </div>

            {/* Unread Badge */}
            {conversation.unreadCount > 0 && (
              <div className="bg-light-primary text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center font-medium">
                {conversation.unreadCount}
              </div>
            )}
          </div>
        ))}

        {/* Help section at bottom */}
        <div className="p-4 mt-auto">
          <div className="bg-white/50 rounded-lg p-3 text-sm">
            <p className="text-foreground font-medium mb-1">
              Are you facing any difficulties with your logistics needs? I'm here to help!
            </p>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 bg-light-primary text-white rounded text-xs hover:bg-primary transition-colors">
                Yes, I need help
              </button>
              <button className="px-3 py-1 bg-gray-200 text-secondary rounded text-xs hover:bg-gray-300 transition-colors">
                No, thanks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;