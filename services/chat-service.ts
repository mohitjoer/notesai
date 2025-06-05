import Chat from '@/mongoDB/models/chat';
import  connectDB  from '@/mongoDB/db';

export async function createChat(userData: {
  userId: string;
  userImage: string;
  firstName: string;
  lastName?: string;
}) {
  try {
    await connectDB();
    const chat = await Chat.create({
      user: userData,
      chat: [],
    });
    return chat;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
}

export async function getUserChats(userId: string) {
  try {
    await connectDB();
    const chats = await Chat.find({ 'user.userId': userId });
    return chats;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
}