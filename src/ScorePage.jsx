import Confetti from "react-confetti"; 
import Celebration from "./Celebration.gif";

const ScoreBoard = ({ score, xp, onRestart }) => {
  let badge;
  let celebration = false;
  if (score >= 80) {
    badge = "🏆 Gold Badge!";
    celebration = true; 
  } else if (score >= 50) {
    badge = "🥈 Silver Badge!";
    celebration = true;
  } else {
    badge = "🥉 Bronze Badge!";
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-red-400 text-white relative">
      {celebration && <Confetti />}   
      <h1 className="text-5xl font-extrabold animate-bounce">🎊 Game Over!</h1>
      <p className="text-3xl mt-4 font-bold">Your Score: {score}/100</p>
      
      <p className="text-4xl mt-6">{badge}</p>
      {celebration && (
        <img src={Celebration} alt="Celebration" className="w-60 h-60 mt-6 animate-spin-slow" />
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
