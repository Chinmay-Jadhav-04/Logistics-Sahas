"use client";
import React from 'react';
import { ArrowLeft } from 'lucide-react';

const MobileView = ({ 
  children, 
  currentView, 
  onBackToMessages, 
  conversation 
}) => {
  
  return (
    <div className="h-full flex flex-col lg:hidden">
      {currentView === 'chat' && conversation && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBackToMessages}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <img
                src={conversation.avatar}
                alt={conversation.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" fill="%23e5e7eb"/><text x="16" y="20" text-anchor="middle" fill="%236b7280" font-family="Arial" font-size="12">${conversation.name.charAt(0)}</text></svg>`;
                }}
              />
            </div>
            {conversation.isOnline && (
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 text-sm">{conversation.name}</h3>
            <p className="text-xs text-green-600">
              {conversation.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default MobileView;