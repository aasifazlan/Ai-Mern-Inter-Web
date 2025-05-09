import React, { useState } from 'react';
import axios from 'axios';

const QuestionForm = () => {
  const [topic, setTopic] = useState('');
  const [qa, setQa] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setQa('');
    try {
      const res = await axios.post('http://localhost:5000/api/ai/generate', { topic });
      
      console.log(res);
      setQa(res.data.data);
    } catch (err) {
        console.error('Error details:', err.response?.data || err.message);
        setQa('Error generating questions.');
            
    } finally {
      setLoading(false);
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
          onChange={(e) => setTopic(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
      <div className="whitespace-pre-wrap bg-white p-4 border rounded">
        {qa || 'AI-generated questions will appear here.'}
      </div>
    </div>
  );
};

export default QuestionForm;
