"use client";

import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";

function StartPage() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    try {
      setLoading(true);
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          chatId: currentChatId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data.response);
        setCurrentChatId(data.chatId);
        setMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="p-4 text-center">
        <h1 className="font-bold font-mono text-5xl">Welcome To Note's AI</h1>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here."
            className="bg-white min-h-32"
            id="message"
          />
          <Button
            variant="outline"
            type="submit"
            className="w-fit mx-auto"
            disabled={loading || !message.trim()}
          >
            {loading ? "Generating..." : "Generate"}
          </Button>
        </form>
      </div>
      {response && (
        <div className="p-4 mt-4">
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="font-semibold mb-2">AI Response:</h2>
            <p className="whitespace-pre-wrap">{response}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StartPage;