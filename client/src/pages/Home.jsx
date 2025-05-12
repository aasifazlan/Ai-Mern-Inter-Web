import React, { useState } from 'react';
import QuestionForm from '../components/QuestionForm';

const Home = () => {
  const [qa, setQa] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-5xl font-bold text-center text-blue-600 mb-6">Your Partner in Crime</h1>
        <QuestionForm setQa={setQa} />
      </div>

      <div className="max-w-3xl w-full mt-10 bg-white shadow-lg rounded-lg p-8">
        <div className="prose max-w-none bg-white p-4 border rounded shadow-inner">
          <div>{qa || 'AI-generated answers will appear here.'}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
