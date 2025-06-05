commit Notes AI

An AI-powered note-taking application built with Next.js, MongoDB, and GROQ AI that helps users manage and improve their notes through AI assistance.

commitcommit Features

- 🤖 AI-powered text improvement and suggestions
- 💬 Real-time chat interface
- 📝 Note history and management
- 🔐 User authentication with Clerk
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design with mobile support

commitcommit Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [MongoDB](https://www.mongodb.com/) - Database
- [GROQ AI](https://groq.com/) - AI language model
- [Clerk](https://clerk.dev/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety

commitcommit Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/notesai.git
   cd notesai
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   MONGO_DB_PASSWORD=your_mongodb_password
   MONGO_DB_USERNAME=your_mongodb_username
   GROQ_API_KEY=your_groq_api_key
   ```

4. Run the development server:

   ```bash
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

commitcommit Project Structure

```
notesai/
├── app/                commit Next.js app directory
│   ├── api/           commit API routes
│   ├── chat/         commit Chat pages
│   └── page.tsx      commit Home page
├── components/        commit React components
├── AI/               commit AI integration
├── mongoDB/          commit Database models and config
├── services/         commit Business logic
├── types/           commit TypeScript types
└── public/          commit Static files
```

commitcommit Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

commitcommit License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
