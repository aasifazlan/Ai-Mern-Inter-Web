import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const TypingLoader = () => (
  <div className="text-gray-600 font-mono text-lg">
    Generating<span className="animate-pulse">...</span>
  </div>
);

const QuestionForm = ({ setQa }) => {
  const [topic, setTopic] = useState('');
  const [fullText, setFullText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [loading, setLoading] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (!loading && fullText) {
      setTypedText('');
      let index = 0;
      const interval = setInterval(() => {
        setTypedText((prev) => prev + fullText[index]);
        index++;
        if (index >= fullText.length) clearInterval(interval);
      }, 20); // typing speed in ms
      return () => clearInterval(interval);
    }
  }, [fullText, loading]);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setQa('');
    setFullText('');
    setTypedText('');
    try {
      const res = await axios.post('http://localhost:5000/api/ai/generate', {
        question: topic,
      });
      const generated = res.data.generatedText;
      setQa(generated);
      setFullText(generated);
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      const errorText = 'Error generating questions.';
      setQa(errorText);
      setFullText(errorText);
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

      <div className="prose max-w-none bg-white p-4  border rounded min-h-[100px]">
        {loading && <TypingLoader />}
        {!loading && <ReactMarkdown>{typedText}</ReactMarkdown>}
      </div>
    </div> 
  );
};

export default QuestionForm;
