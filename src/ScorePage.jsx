import React from "react";
import Confetti from "react-confetti";
import Celebration from "./Celebration.gif"; 
import SadFace from "./TryAgain.gif"; 

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
    <div className={`h-screen w-[1200px] flex flex-col items-center justify-center ${
      sadScreen ? "bg-gradient-to-r from-purple-400 to-red-400" : "bg-gradient-to-r from-purple-400 to-red-400"
    } text-white relative`}>
      {celebration && <Confetti />}
      {!sadScreen ? (
        <>
          <h1 className="text-5xl font-extrabold animate-bounce">🎊 Game Over!</h1>
          <p className="text-3xl mt-4 font-bold">Your Score: {score}/100</p>
          <p className="text-4xl mt-6">{badge}</p>
          <img src={Celebration} alt="Celebration" className="w-60 h-60 mt-6 animate-spin-slow" />
        </>
      ) : (

        <>
          <h1 className="text-5xl font-extrabold text-red-500">☹️ Try Again!</h1>
          <p className="text-3xl mt-4 font-bold text-gray-300">Your Score: {score}/100</p>
          <img src={SadFace} alt="Try Again" className="w-60 h-60 mt-6 opacity-80" />
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
