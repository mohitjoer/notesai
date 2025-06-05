import { Schema, model, Document, models, Model } from 'mongoose';

interface IMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface IUser {
  userId: string;
  userImage: string;
  firstName: string;
  lastName?: string;
}

interface IUserDocument extends Document {
  user: IUser;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUserDocument>(
  {
    user: {
      userId: { type: String, required: true },
      userImage: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String },
    },
    messages: [{
      role: { type: String, enum: ['user', 'assistant'], required: true },
      content: { type: String, required: true }
    }],
  },
  {
    timestamps: true,
  }
);

const Chat: Model<IUserDocument> = models.Chat || model<IUserDocument>('Chat', userSchema);

export default Chat;