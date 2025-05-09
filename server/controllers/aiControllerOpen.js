import { generateInterviewQA } from '../services/openaiService.js';

export const getInterviewQA = async (req, res) => {
  const { topic } = req.body;
  console.log('Received topic:', topic);
  try {
    const result = await generateInterviewQA(topic);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
