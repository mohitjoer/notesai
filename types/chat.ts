export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Chat {
  _id: string;
  user: {
    userId: string;
    firstName: string;
    lastName?: string;
    userImage: string;
  };
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}