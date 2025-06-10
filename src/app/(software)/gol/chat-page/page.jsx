'use client';

import React, { useEffect, useState } from 'react';
import { useSidebar } from '@/contexts/SidebarProvider';
import Messages from './components/messages';


const ChatPage = () => {
  const [activeTab, setActiveTab] = useState('CFS');
  const { setTitle } = useSidebar();

  useEffect(() => {
    setTitle('Chat-App');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Messages activeTab={activeTab} />
        
      </div>
    </div>
  );
};

export default ChatPage;