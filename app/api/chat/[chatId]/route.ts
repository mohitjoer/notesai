import { NextResponse } from "next/server";
import Chat from "@/mongoDB/models/chat";
import connectDB from "@/mongoDB/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userId = user.id;

    await connectDB();
    
    const chat = await Chat.findOne({
      _id: params.chatId,
      "user.userId": userId,
    });

    if (!chat) {
      return new NextResponse("Chat not found", { status: 404 });
    }

    return NextResponse.json(chat);
  } catch (error) {
    console.error('[CHAT_GET]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}