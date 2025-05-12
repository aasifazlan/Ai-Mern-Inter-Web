import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getInterviewQA = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Please provide a question." });
    }

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(question);
    const response = await result.response;
    const rawText = response.text();

    res.json({ generatedText: rawText });
  } catch (error) {
    res.status(500).json({
      message: "Error generating response",
      error: error.message,
    });
  }
};
