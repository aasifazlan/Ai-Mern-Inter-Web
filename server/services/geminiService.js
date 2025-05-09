// server/services/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateGeminiQA(topic) {
  const model = genAI.getGenerativeModel({ model: "models/gemini-pro" });

  const prompt = `Generate 5 interview questions and answers on the topic: ${topic}`;
  console.log("Sending prompt:", prompt);

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Gemini API error:", error.message);
    throw error;
  }
}
