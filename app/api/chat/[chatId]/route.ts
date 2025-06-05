import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import Chat from "@/mongoDB/models/chat";
import connectDB from "@/mongoDB/db";

// GET /api/chat/[chatId]
export async function GET(req: NextRequest, context: any) {
  const { chatId } = context.params;
  try {
    const user = await currentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();

    const chat = await Chat.findOne({
      _id: chatId,
      "user.userId": user.id,
    });

    if (!chat) {
      return new NextResponse("Chat not found", { status: 404 });
    }

    return NextResponse.json(chat);
  } catch (error) {
    console.error("[CHAT_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// PATCH /api/chat/[chatId]
export async function PATCH(req: NextRequest, context: any) {
  const { chatId } = context.params;
  try {
    const user = await currentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { message } = await req.json();
    if (!message) {
      return new NextResponse("Message is required", { status: 400 });
    }

    await connectDB();

    const chat = await Chat.findOne({
      _id: chatId,
      "user.userId": user.id,
    });

    if (!chat) {
      return new NextResponse("Chat not found", { status: 404 });
    }

    chat.messages.push({
      role: "user",
      content: message,
    });

    await chat.save();

    return NextResponse.json(chat);
  } catch (error) {
    console.error("[CHAT_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
