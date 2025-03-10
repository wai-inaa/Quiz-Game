import { useState } from "react";
import IntroScreen from "./IntroScreen"; 
import QuizGame from "./QuizPage";
import ParentDashboard from "./ParentDashboard";
import ScoreBoard from "./ScorePage";
import SubjectSelection from "./SubjectSelection";  

function App() {
  const [gameState, setGameState] = useState("intro");
  const [playerName, setPlayerName] = useState("");
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [score, setScore] = useState(0);
  const [userType, setUserType] = useState("");
  const saveScore = (name, subject, difficulty, score) => {
    const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    scores.push({ name, subject, difficulty, score, date: new Date().toLocaleDateString() });
    localStorage.setItem("quizScores", JSON.stringify(scores));
    setGameState("scoreboard");
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 to-purple-400 text-white">
      {gameState === "intro" && (
        <IntroScreen 
          onStart={(type, name) => {
            setUserType(type);
            setPlayerName(name);
            setGameState(type === "Student" ? "selectSubject" : "parentDashboard");
          }} 
        />
      )}
      {gameState === "selectSubject" && (
        <SubjectSelection 
          onSelect={(selectedSubject, selectedDifficulty) => {
            setSubject(selectedSubject);
            setDifficulty(selectedDifficulty);
            setGameState("quiz");
          }}
        />
      )}
      {gameState === "quiz" && (
        <QuizGame 
          name={playerName} 
          subject={subject}  
          difficulty={difficulty}
          onGameEnd={(finalScore) => { 
            setScore(finalScore);
            saveScore(playerName, subject, difficulty, finalScore);
          }} 
          onGoToMainMenu={() => setGameState("intro")} 
        />
      )}
      {gameState === "parentDashboard" && (
        <ParentDashboard 
          childName={playerName} 
          onBack={() => setGameState("intro")} 
        />
      )}
      {gameState === "scoreboard" && (
        <ScoreBoard 
          score={score} 
          subject={subject} 
          difficulty={difficulty} 
          onRestart={() => setGameState("intro")} 
        />
      )}
    </div>
  );
}
export default App;
