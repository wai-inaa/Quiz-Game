import React from "react";
import Confetti from "react-confetti";

const ScoreBoard = ({ score, onRestart }) => {
  let badge;
  let celebration = false;
  let sadScreen = false;

  if (score >= 90) {
    badge = "🏆 Gold Badge!";
    celebration = true; 
  } else if (score >= 70) {
    badge = "🥈 Silver Badge!";
    celebration = true;
  } else if (score >= 50) {
    badge = "🥉 Bronze Badge!";
  } else {
    sadScreen = true;
  }

  return (
    <div className={`h-screen w-screen flex flex-col items-center justify-center relative p-4 ${
      sadScreen ? "bg-gradient-to-r from-red-500 to-purple-600" : "bg-gradient-to-r from-purple-400 to-blue-400"
    } text-white`}>
      
      {celebration && <Confetti />}
      {!sadScreen ? (
        <>
          <h1 className="text-5xl font-extrabold animate-bounce">🎊 Game Over!</h1>
          <p className="text-3xl mt-4 font-bold">Your Score: {score}/100</p>
          <p className="text-4xl mt-6">{badge}</p>
          <img src="/Gifs/Celebration.gif" alt="Celebration" className="w-60 h-60 mt-6 animate-spin-slow" />
        </>
      ) : (
        <>
          <h1 className="text-5xl font-extrabold text-red-500">☹️ Try Again!</h1>
          <p className="text-3xl mt-4 font-bold text-gray-300">Your Score: {score}/100</p>
          <img src="/Gifs/TryAgain.gif" alt="Try Again" className="w-60 h-60 mt-6 opacity-80" />
        </>
      )}
      <button 
        className="mt-6 px-8 py-4 bg-blue-500 hover:bg-blue-700 text-white rounded-full text-2xl transition-transform transform hover:scale-110"
        onClick={onRestart}
      >
        🔄 Play Again
      </button>
    </div>
  );
};
export default ScoreBoard;
