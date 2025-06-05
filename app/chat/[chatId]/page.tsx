"use client";

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const { chatId } = useParams();
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchChat = async () => {
      if (!chatId || !user) return;
      
      try {
        const response = await fetch(`/api/chat/${chatId}`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages);
        }
      } catch (error) {
        console.error('Error fetching chat:', error);
      }
    };

    fetchChat();
  }, [chatId, user]);

  return (

      <div className="relative  p-6 ">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
  );
}