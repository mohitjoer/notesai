import { getGroqChatCompletion } from "../../AI/groq";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Chat from "../../../mongoDB/models/chat";
import connectDB from "../../../mongoDB/db";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const { message, chatId } = await req.json();

    
    const completion = await getGroqChatCompletion(message);
    let aiResponse = completion.choices[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from AI");
    }

    aiResponse = aiResponse.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

    let chat;
    if (chatId) {
      chat = await Chat.findById(chatId);
      if (!chat) {
        chat = await Chat.create({
          user: {
            userId: user.id,
            userImage: user.imageUrl,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          messages: []
        });
      }
      chat.messages.push(
        { role: 'user', content: message },
        { role: 'assistant', content: aiResponse }
      );
      await chat.save();
    } else {
      chat = await Chat.create({
        user: {
          userId: user.id,
          userImage: user.imageUrl,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        messages: [
          { role: 'user', content: message },
          { role: 'assistant', content: aiResponse }
        ]
      });
    }

    return NextResponse.json({ 
      response: aiResponse,
      chatId: chat._id,
      messages: chat.messages 
    });

  } catch (error) {
    console.error('[AI_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}