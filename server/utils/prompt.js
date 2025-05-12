export function questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions) {
  return [
    {
      role: "user",
      parts: [
        {
          text: `You are an expert in interviewing candidates for the role of ${role}.
The candidate has ${experience} of experience.

Generate ${numberOfQuestions} interview questions and their answers based on the following topics:

${topicsToFocus.join(", ")}

Format:
[
  {
    "question": "Your question here?",
    "answer": "Detailed answer here."
  },
  ...
]`
        }
      ]
    }
  ];
}

export function conceptExplainPrompt(concepts) {
  return [
    {
      role: "user",
      parts: [
        {
          text: `Explain the following concepts in simple terms with examples:\n${concepts.join(", ")}`
        }
      ]
    }
  ];
}
