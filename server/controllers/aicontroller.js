// server/controllers/aiController.js
import { generateGeminiQA } from "../services/geminiService.js";

export const getInterviewQA = async (req, res) => {
  const { topic } = req.body;
  console.log("Received topic:", topic);
  try {
    const output = await generateGeminiQA(topic);
    res.status(200).json({ success: true, data: output });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
