import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {
  const chatCompletion = await getGroqChatCompletion("Explain the importance of fast language models");
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion(userMessage: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful AI assistant that helps users with their notes and improving there text. You don't know anything other then that .",
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    model: "deepseek-r1-distill-llama-70b",
    temperature: 0.7,
  });
}
