"use client";

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { Button } from './ui/button';

interface Chat {
  _id: string;
  user: {
    userId: string;
    firstName: string;
    lastName?: string;
    userImage: string;
  };
  messages: {
    role: 'user' | 'assistant';
    content: string;
  }[];
  createdAt: string;
}

function SideBarMenu() {
  const { user } = useUser();
  const router = useRouter();
  const [chats, setChats] = useState<Chat[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const side = "left";

  useEffect(() => {
    const fetchChats = async () => {
      if (!user) return;
      
      try {
        const response = await fetch('/api/chat');
        if (response.ok) {
          const data = await response.json();
          setChats(data);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [user]);
  
  const handleChatClick = (chatId: string) => {
    router.push(`/chat/${chatId}`);
    setIsOpen(false); 
  };

  const handleNewChat = async () => {
    try {
      await router.push('/');
      setIsOpen(false);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <div className="h-full">    
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild> 
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side={side} className="w-[300px]">
          <SheetHeader className="mb-4">
            <SheetTitle>Your Chats</SheetTitle>
            <SheetDescription>
              Past conversations
              <Button 
                variant="outline" 
                onClick={handleNewChat} 
                className="mt-2 w-full"
              >
                New Chat
              </Button>
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-2">
            {chats.map((chat) => (
              <Button 
                key={chat._id}
                variant="ghost"
                onClick={() => handleChatClick(chat._id)}
                className="flex flex-col items-start w-full p-3 hover:bg-gray-100"
              >
                <span className="font-medium text-sm truncate w-full">
                  {chat.messages[0]?.content.slice(0, 30)}...
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  {new Date(chat.createdAt).toLocaleDateString()}
                </span>
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SideBarMenu;