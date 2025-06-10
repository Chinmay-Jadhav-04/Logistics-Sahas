"use client";
import React, { useState } from 'react';
import { X, Search, Users } from 'lucide-react';

const AddNewConversation = ({ isOpen, onClose, onAddConversation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Mock users data - replace with actual data from PocketBase
  const availableUsers = [
    {
      id: 1,
      name: 'Mumbai Port CFS',
      email: 'mumbai@cfs.com',
      avatar: '/api/placeholder/40/40',
      isOnline: true,
      company: 'Mumbai CFS Ltd.'
    },
    {
      id: 2,
      name: 'Delhi Logistics Hub',
      email: 'delhi@logistics.com',
      avatar: '/api/placeholder/40/40',
      isOnline: false,
      company: 'Delhi Logistics'
    },
    {
      id: 3,
      name: 'Chennai Port Authority',
      email: 'chennai@port.com',
      avatar: '/api/placeholder/40/40',
      isOnline: true,
      company: 'Chennai Port'
    },
    {
      id: 4,
      name: 'Kolkata CFS Services',
      email: 'kolkata@cfs.com',
      avatar: '/api/placeholder/40/40',
      isOnline: true,
      company: 'Kolkata CFS'
    },
    {
      id: 5,
      name: 'Bangalore Freight Hub',
      email: 'bangalore@freight.com',
      avatar: '/api/placeholder/40/40',
      isOnline: false,
      company: 'Bangalore Freight'
    }
  ];

  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (user) => {
    if (selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleStartConversation = () => {
    if (selectedUsers.length > 0) {
      // For single user, start direct conversation
      if (selectedUsers.length === 1) {
        const newConversation = {
          id: Date.now(),
          name: selectedUsers[0].name,
          lastMessage: 'Conversation started',
          time: 'now',
          unreadCount: 0,
          avatar: selectedUsers[0].avatar,
          isOnline: selectedUsers[0].isOnline,
          users: selectedUsers
        };
        onAddConversation(newConversation);
      } else {
        // For multiple users, create group conversation
        const newConversation = {
          id: Date.now(),
          name: `Group: ${selectedUsers.map(u => u.name.split(' ')[0]).join(', ')}`,
          lastMessage: 'Group conversation started',
          time: 'now',
          unreadCount: 0,
          avatar: '/api/placeholder/40/40',
          isOnline: true,
          users: selectedUsers,
          isGroup: true
        };
        onAddConversation(newConversation);
      }
      
      // Reset and close
      setSelectedUsers([]);
      setSearchTerm('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background border rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">New Conversation</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users, companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Selected Users */}
        {selectedUsers.length > 0 && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Selected ({selectedUsers.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedUsers.map(user => (
                <div
                  key={user.id}
                  className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-gray-300 overflow-hidden">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><rect width="20" height="20" fill="%23e5e7eb"/><text x="10" y="12" text-anchor="middle" fill="%236b7280" font-family="Arial" font-size="8">${user.name.charAt(0)}</text></svg>`;
                      }}
                    />
                  </div>
                  <span>{user.name.split(' ')[0]}</span>
                  <button
                    onClick={() => handleUserSelect(user)}
                    className="w-4 h-4 hover:bg-green-200 rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users List */}
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedUsers.find(u => u.id === user.id) ? 'bg-green-50' : ''
              }`}
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" fill="%23e5e7eb"/><text x="20" y="24" text-anchor="middle" fill="%236b7280" font-family="Arial" font-size="14">${user.name.charAt(0)}</text></svg>`;
                    }}
                  />
                </div>
                {user.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate">{user.name}</h3>
                <p className="text-sm text-gray-500 truncate">{user.company}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>

              {/* Selection Indicator */}
              {selectedUsers.find(u => u.id === user.id) && (
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleStartConversation}
            disabled={selectedUsers.length === 0}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Start Chat ({selectedUsers.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewConversation;