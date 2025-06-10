"use client";
import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';

const Messages = ({ onSelectConversation, selectedConversation, conversations, onShowAddConversation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All'); // 'All', 'CFS', 'Customer', 'GOL'
  const [showFilter, setShowFilter] = useState(false);
  
  // Default mock data matching your images
  const defaultConversations = [
    {
      id: 1,
      name: 'FX CFS',
      lastMessage: 'Haha oh man 🔥',
      time: '12m ago',
      unreadCount: 64,
      avatar: '/api/placeholder/40/40',
      isOnline: true,
      type: 'CFS'
    },
    {
      id: 2,
      name: 'GNS CFS',
      lastMessage: "Haha that's terrifying 😱",
      time: '1h ago',
      unreadCount: 35,
      avatar: '/api/placeholder/40/40',
      isOnline: true,
      type: 'CFS'
    },
    {
      id: 3,
      name: 'Sahas Logistic',
      lastMessage: 'omg, this is amazing',
      time: '5h ago',
      unreadCount: 20,
      avatar: '/api/placeholder/40/40',
      isOnline: false,
      type: 'Customer'
    },
    {
      id: 4,
      name: 'Pratik NX CFS',
      lastMessage: 'love 😍',
      time: '2d ago',
      unreadCount: 15,
      avatar: '/api/placeholder/40/40',
      isOnline: false,
      type: 'CFS'
    },
    {
      id: 5,
      name: 'Alfonzo Schuessler',
      lastMessage: 'perfect!',
      time: '1m ago',
      unreadCount: 17,
      avatar: '/api/placeholder/40/40',
      isOnline: true,
      type: 'Customer'
    },
    {
      id: 6,
      name: 'Florencio Dorrance',
      lastMessage: 'woohoooo',
      time: '24min ago',
      unreadCount: 0,
      avatar: '/api/placeholder/40/40',
      isOnline: true,
      type: 'Customer'
    },
    {
      id: 7,
      name: 'MumbaiCFS',
      lastMessage: 'Request for Job order',
      time: '5h ago',
      unreadCount: 8,
      avatar: '/api/placeholder/40/40',
      isOnline: false,
      type: 'CFS'
    },
    {
      id: 8,
      name: 'TaraLogistics',
      lastMessage: 'went trip Gory',
      time: '5h ago',
      unreadCount: 6,
      avatar: '/api/placeholder/40/40',
      isOnline: false,
      type: 'Customer'
    }
  ];

  const conversationsList = conversations.length > 0 ? conversations : defaultConversations;

  // Filter conversations
  const filteredConversations = conversationsList.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || conv.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const totalUnreadCount = conversationsList.reduce((acc, conv) => acc + conv.unreadCount, 0);

  const filterOptions = ['All', 'CFS', 'Customer', 'GOL'];

  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Header - matches your green design */}
      <div className="bg-primary px-4 py-3 flex items-center justify-between rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-white">Messages</h2>
          {totalUnreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {totalUnreadCount}
            </span>
          )}
        </div>
        <button 
          onClick={onShowAddConversation}
          className="p-2 hover:bg-green-700 rounded-full transition-colors"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-accent rounded-lg border-b border-background">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search messages"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Filter Section */}
      <div className="px-4 py-2 bg-accent border rounded-lg border-background">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-1 px-3 py-1 bg-white rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filter: {filterType}
          </button>
        </div>
        
        {showFilter && (
          <div className="mt-2 flex gap-2 flex-wrap">
            {filterOptions.map(option => (
              <button
                key={option}
                onClick={() => {
                  setFilterType(option);
                  setShowFilter(false);
                }}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  filterType === option
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto rounded-lg bg-accent">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`flex items-center gap-3 p-3 hover:bg-white hover:bg-opacity-70 cursor-pointer border-b border-green-100 transition-colors ${
              selectedConversation?.id === conversation.id 
                ? 'bg-white shadow-sm border-l-4 border-l-green-600' 
                : ''
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
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900 truncate">
                    {conversation.name}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    conversation.type === 'CFS' 
                      ? 'bg-blue-100 text-blue-800'
                      : conversation.type === 'GOL'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {conversation.type}
                  </span>
                </div>
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
              <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center font-medium">
                {conversation.unreadCount}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;