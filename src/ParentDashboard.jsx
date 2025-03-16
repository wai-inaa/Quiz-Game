import { useEffect, useState } from "react";

const ParentDashboard = ({ childName, onBack }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    setScores(savedScores.filter(score => score.name === childName));
  }, [childName]);

  return (
    <div className="flex flex-col items-center justify-start w-screen h-screen bg-gradient-to-r from-yellow-400 to-red-400 text-white p-6 relative">
      
      <img src="/Gifs/Parent.gif" alt="Parent" className="absolute top-6 left-6 w-40 h-40 animate-bounce" />
      
      <h1 className="text-5xl font-extrabold bg-white text-red-600 px-6 py-3 rounded-xl shadow-xl">
        📊 {childName}'s Progress Report
      </h1>

      {scores.length === 0 ? (
        <div className="mt-6 flex flex-col items-center">
          <p className="text-2xl font-bold text-white bg-red-600 px-6 py-3 rounded-lg">
            No quiz results found for {childName}
          </p>
          <img src="noData.gif" alt="No Data" className="w-56 h-56 mt-4" />
        </div>
      ) : (
        <div className="mt-6 w-2/3 bg-white p-6 rounded-xl shadow-2xl text-black border-4 border-yellow-400 max-h-[500px] overflow-y-auto">
          <h2 className="text-2xl font-bold text-center">🏆 Recent Quiz Scores:</h2>
          <ul className="mt-4 space-y-4">
            {scores.map((score, index) => (
              <li key={index} className="p-4 border-b-2 border-gray-300 flex flex-col bg-gray-100 rounded-lg">
                <p className="text-lg font-semibold">📅 {score.date}</p>
                <p className="text-lg">📚 Subject: <span className="font-bold">{score.subject}</span></p>
                <p className="text-lg">🎚 Level: <span className="font-bold">{score.level}</span></p>
                <p className="text-lg font-bold text-blue-600">🎯 Score: {score.score} / 100</p>
                <div className="w-full bg-gray-300 h-6 rounded-full mt-2">
                  <div 
                    className={`h-6 rounded-full transition-all duration-500 ${
                      score.score >= 80 ? "bg-green-500" : score.score >= 50 ? "bg-yellow-500" : "bg-red-500"
                    }`} 
                    style={{ width: `${score.score}%` }}
                  ></div>
                </div>

                {score.score >= 80 && <img src="/Gifs/Trophy.gif" alt="Trophy" className="w-20 h-20 mt-4 mx-auto animate-pulse" />}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button 
        className="mt-8 flex items-center bg-blue-600 hover:bg-blue-800 text-white text-xl font-bold px-6 py-3 rounded-full shadow-xl transition-transform transform hover:scale-110"
        onClick={onBack}
      >
        <img src="/Gifs/back.png" alt="Back" className="w-8 h-8 mr-2" />
        Back to Main Menu
      </button>
    </div>
  );
};
export default ParentDashboard;
