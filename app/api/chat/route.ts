import { createChat, getUserChats } from '../../../services/chat-service';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const chat = await createChat({
      userId: user.id,
      userImage: user.imageUrl,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
    });

    return NextResponse.json(chat);
  } catch (error) {
    console.error('[CHAT_POST]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chats = await getUserChats(user.id);
    return NextResponse.json(chats);
  } catch (error) {
    console.error('[CHAT_GET]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}