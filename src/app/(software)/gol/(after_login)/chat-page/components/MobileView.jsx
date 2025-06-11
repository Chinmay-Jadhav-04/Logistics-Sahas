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