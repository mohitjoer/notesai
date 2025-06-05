import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";
import { useUser } from '@clerk/nextjs';

function InputBar() {
  const [message, setMessage] = useState('');
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userImage: user.imageUrl,
          firstName: user.firstName,
          lastName: user.lastName,
          message,
        }),
      });

      if (response.ok) {
        setMessage('');
        // Trigger chat refresh in sidebar
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-full flex align-middle p-4 bg-gray-300 rounded-md">
      <Textarea 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here." 
        className="bg-white" 
        id="message" 
      />
      <Button className="rounded-full" variant={"outline"} type="submit">
        <SendIcon/>
      </Button>
    </form>
  );
}

export default InputBar;