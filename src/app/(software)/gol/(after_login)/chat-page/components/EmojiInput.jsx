
"use client";
import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Smile } from 'lucide-react';

const EmojiInput = ({ onEmojiClick, className = "" }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    onEmojiClick(emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="p-1 text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
      >
        <Smile className="w-4 h-4" />
      </button>
      
      {showPicker && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setShowPicker(false)}
          />
          
          {/* Emoji Picker */}
          <div className="absolute bottom-full right-0 mb-2 z-20">
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width={300}
              height={400}
              previewConfig={{
                showPreview: false
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EmojiInput;