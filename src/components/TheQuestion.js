import React, { useState } from "react";

function TheQuestion({ question, answers, selected }) {
  const [Answer, setAnswer] = useState(answers);

  return (
    <div>
      <div className="question">{question}</div>
      <div className="awenser">
        {Answer.map((text, index) => (
          <button
            key={index}
            className="btn"
            onClick={() => {
              setAnswer([text]);
              selected(text);
            }}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TheQuestion;
