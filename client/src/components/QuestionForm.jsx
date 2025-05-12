import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const QuestionForm = () => {
  const [topic, setTopic] = useState('');
  const [qa, setQa] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return; // Check if there's a topic
    setLoading(true); 
    setQa(''); // Clear previous QA
    try {
      const res = await axios.post('http://localhost:5000/api/ai/generate', { question: topic });
      console.log(res);
      setQa(res.data.generatedText); // Assuming the response has a 'generatedText' field
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      setQa('Error generating questions.'); // Display error message
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Enter topic e.g. JavaScript"
          value={topic}
          onChange={(e) => setTopic(e.target.value)} // Handle input change
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleGenerate} // Trigger question generation
          disabled={loading} // Disable the button while loading
        >
          {loading ? 'Generating...' : 'Generate'} 
        </button>
      </div>
      <div className="prose max-w-none bg-white p-4 border rounded">
        <ReactMarkdown>{qa }</ReactMarkdown> 
        {/* Display generated content or default message */}
      </div>
    </div>
  );
};

export default QuestionForm;
