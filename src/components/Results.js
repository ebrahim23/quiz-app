import React from "react";

function Results({ score, playAgain }) {
  return (
    <div className="result">
      <h1>You scored {score} / 5</h1>
      <button className="result-btn" onClick={playAgain}>
        Play Again!
      </button>
    </div>
  );
}

export default Results;
