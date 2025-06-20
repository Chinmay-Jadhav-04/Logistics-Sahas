"use client";
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  ArrowLeft, 
  Image, 
  FileText, 
  Video, 
  User, 
  Mic,
  Smile
} from 'lucide-react';
import EmojiInput from './EmojiInput';

const ChatPopupScreen = ({ conversation, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const attachmentRef = useRef(null);
  const emojiRef = useRef(null);

  // Mock messages data matching the design in your image
  useEffect(() => {
    if (conversation?.name === 'Florencio Dorrance') {
      setMessages([
        {
          id: 1,
          text: 'omg, this is amazing',
          sender: 'user',
          timestamp: new Date(Date.now() - 60000 * 30),
          avatar: '/api/placeholder/32/32'
        },
        {
          id: 2,
          text: 'perfect!✅',
          sender: 'user',
          timestamp: new Date(Date.now() - 60000 * 25),
          avatar: '/api/placeholder/32/32'
        },
        {
          id: 3,
          text: 'Wow, this is really epic',
          sender: 'user',
          timestamp: new Date(Date.now() - 60000 * 20),
          avatar: '/api/placeholder/32/32'
        },
        {
          id: 4,
          text: 'How are you?',
          sender: 'gol',
          timestamp: new Date(Date.now() - 60000 * 15),
          avatar: '/api/placeholder/32/32'
        },
        {
          id: 5,
          text: 'just ideas for next time',
          sender: 'user',
          timestamp: new Date(Date.now() - 60000 * 10),
          avatar: '/api/placeholder/32/32'
        },
        {
          id: 6,
          text: "I'll be there in 2 mins ⏰",
          sender: 'user',
          timestamp: new Date(Date.now() - 60000 * 8),
          avatar: '/api/placeholder/32/32'
        },
        {
          id: 7,
          text: 'woohoooo',
          sender: 'gol',
          timestamp: new Date(Date.now() - 60000 * 5),
          avatar: '/api/placeholder/32/32'
        },
        {
          id: 8,
          text: 'Haha oh man',
          sender: 'gol',
          timestamp: new Date(Date.now() - 60000 * 4),
          avatar: '/api/placeholder/32/32'
        },
        {
          id: 9,
          text: "Haha that's terrifying 😱",
          sender: 'gol',
          timestamp: new Date(Date.now() - 60000 * 3),
          avatar: '/api/placeholder/32/32'
        },
        {
          id: 10,
          text: 'aww',
          sender: 'user',
          timestamp: new Date(Date.now() - 60000 * 2),
          avatar: '/api/placeholder/32/32'
        },
        {
          id: 11,
          text: 'omg, this is amazing',
          sender: 'user',
          timestamp: new Date(Date.now() - 60000 * 1),
          avatar: '/api/placeholder/32/32'
        },
        {
          id: 12,
          text: 'woohoooo 🔥',
          sender: 'user',
          timestamp: new Date(Date.now() - 30000),
          avatar: '/api/placeholder/32/32'
        },
        {
          id: 13,
          text: 'woohoooo',
          sender: 'gol',
          timestamp: new Date(Date.now() - 20000),
          avatar: '/api/placeholder/32/32'
        },
        {
          id: 14,
          text: 'Haha oh man',
          sender: 'gol',
          timestamp: new Date(Date.now() - 15000),
          avatar: '/api/placeholder/32/32'
        },
        {
          id: 15,
          text: "Haha that's terrifying 😱",
          sender: 'gol',
          timestamp: new Date(Date.now() - 10000),
          avatar: '/api/placeholder/32/32'
        }
      ]);
    } else {
      setMessages([
        {
          id: 1,
          text: 'Hello! How can I help you today?',
          sender: 'gol',
          timestamp: new Date(Date.now() - 60000),
          avatar: '/api/placeholder/32/32'
        }
      ]);
    }
  }, [conversation]);

  // Handle click outside for attachment options and emoji picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (attachmentRef.current && !attachmentRef.current.contains(event.target)) {
        setShowAttachmentOptions(false);
      }
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'gol',
        timestamp: new Date(),
        avatar: '/api/placeholder/32/32'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessage(prev => prev + emoji);
  };

  const handleAttachmentClick = (type) => {
    console.log(`Selected attachment type: ${type}`);
    setShowAttachmentOptions(false);
    
    // Handle different attachment types
    switch(type) {
      case 'photo':
        // Handle photo upload
        break;
      case 'document':
        // Handle document upload
        break;
      default:
        break;
    }
  };

  const attachmentOptions = [
    { type: 'photo', icon: Image, label: 'Photo', color: 'bg-blue-500' },
    { type: 'document', icon: FileText, label: 'Document', color: 'bg-green-500' },
  ];

  if (!conversation) return null;

  return (
    <div className="flex flex-col min-h-[80dvh] rounded-lg bg-gray-50">
      {/* Header - matches the green design with back button */}
      <div className="bg-primary px-4 py-3 rounded-lg flex items-center gap-3 shadow-sm">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-green-700 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img
              src={conversation.avatar}
              alt={conversation.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" fill="%23e5e7eb"/><text x="20" y="24" text-anchor="middle" fill="%236b7280" font-family="Arial" font-size="14">${conversation.name.charAt(0)}</text></svg>`;
              }}
            />
          </div>
          {conversation.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-white">{conversation.name}</h3>
          <p className="text-sm text-green-100">
            {conversation.isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 rounded-lg overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'gol' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src={msg.avatar}
                  alt="User"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" fill="%23e5e7eb"/><text x="16" y="20" text-anchor="middle" fill="%236b7280" font-family="Arial" font-size="12">U</text></svg>`;
                  }}
                />
              </div>
            )}
            
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                msg.sender === 'gol'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>

            {msg.sender === 'gol' && (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                GOL
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-accent rounded-lg border border-primary p-4">
        <div className="flex items-center gap-3">
          {/* Attachment Button with Options */}
          <div className="relative" ref={attachmentRef}>
            <button 
              onClick={() => setShowAttachmentOptions(!showAttachmentOptions)}
              className="p-2 text-primary hover:text-primary hover:bg-gray-100 rounded-full transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            {/* Attachment Options Popup */}
            {showAttachmentOptions && (
              <div className="absolute bottom-full left-0 mb-2 bg-accent rounded-lg shadow-lg border border-gray-200 p-2 min-w-[200px]">
                {attachmentOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.type}
                      onClick={() => handleAttachmentClick(option.type)}
                      className="flex items-center gap-3 w-full p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className={`p-2 rounded-full ${option.color}`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-2 pr-12 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors"
            />
            
            <div className="absolute bg-accent right-3 top-1/2 transform -translate-y-1/2">
              <EmojiInput onEmojiClick={handleEmojiClick} />
            </div>
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopupScreen;