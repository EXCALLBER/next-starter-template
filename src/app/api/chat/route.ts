// import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { convertToModelMessages, streamText } from "ai";

// key
// const gemini = createGoogleGenerativeAI({
//   apiKey: process.env.GOOGLE_KEY,
// });

const groq = createGroq({ apiKey: process.env.GROQ_KEY });

export const maxDuration = 30;
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 2. 基础输入校验
    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid messages format", { status: 400 });
    }

    const result = streamText({
      // model: gemini("gemini-2.0-flash"),
      model: groq("llama-3.3-70b-versatile"),
      messages: await convertToModelMessages(messages),
      system: "你是一个高级程序员，请根据用户的问题给出回答",
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("LLM_STREAM_ERROR:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}