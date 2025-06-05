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
  };

  return (
    <div className="h-full border-r left-0 bg-gray-300 flex flex-col gap-4 p-4">    
      <Sheet>
        <SheetTrigger asChild> 
          <MenuIcon className="cursor-pointer"/>
        </SheetTrigger>
        <SheetContent className="w-80" side={side}>
          <SheetHeader>
            <SheetTitle>Your Chats</SheetTitle>
            <SheetDescription>
              Past conversations
              <br></br>
              <Button  variant={"outline"} onClick={() => router.push('/')} className="w-1/2">
              New Chat
            </Button>
            </SheetDescription>
          </SheetHeader>

          <div>

            
            {chats.map((chat) => (
              <div key={chat._id} className='flex flex-col align-center items-center justify-center'>
                <Button 
                  variant="outline"
                  onClick={() => handleChatClick(chat._id)}
                  className=" mt-2 hover:bg-gray-100 w-6/7 rounded cursor-pointer"
                >
                  <h3 className="font-medium truncate">
                    {chat.messages[0]?.content.slice(0, 30)}...
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(chat.createdAt).toLocaleDateString()}
                  </p>
                </Button>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SideBarMenu;