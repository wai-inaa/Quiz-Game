import { useState } from "react";
import EnglishGif from "./English.gif";
import UrduGif from "./urdu.gif";
import MathGif from "./Math.gif";
import DrawingGif from "./Drawing.gif";
import ScienceGif from "./Science.gif"; 
import FunGif from "./Fun.gif";
import Teacher from "./teacher.gif";
import LetsGo from "./GO.gif";

const subjects = [
  { name: "English", gif: EnglishGif },
  { name: "Urdu", gif: UrduGif },
  { name: "Math", gif: MathGif },
  { name: "Drawing", gif: DrawingGif },
  { name: "Science", gif: ScienceGif }, 
];

const SubjectSelection = ({ onSelect }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
  const handleStartQuiz = () => {
    if (selectedSubject && selectedDifficulty) {
      onSelect(selectedSubject, selectedDifficulty);
    } else {
      alert("Please select both a subject and difficulty level before starting!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-[1200px] bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400 text-white relative overflow-hidden p-4">
      <img src={FunGif} alt="Fun" className="w-40 h-40 absolute top-6 right-6 animate-bounce" />
      <img src={Teacher} alt="Teacher" className="w-40 h-40 absolute bottom-8 left-8 animate-spin-slow" />
      <img src={LetsGo} alt="LetsGo" className="w-40 h-40 absolute bottom-10 right-12 animate-pulse" />
      <h1 className="text-5xl font-extrabold bg-white text-purple-600 px-6 py-3 rounded-3xl shadow-lg">
        Select Subject & Difficulty Level
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-6">
        {subjects.map(({ name, gif }) => (
          <button
            key={name}
            className={`flex flex-col items-center p-6 rounded-2xl transition transform hover:scale-110 shadow-2xl ${
              selectedSubject === name ? "bg-green-600 text-white" : "bg-white text-gray-900"
            }`}
            onClick={() => setSelectedSubject(name)}
          >
            <img src={gif} alt={name} className="w-32 h-32 mb-2 rounded-full shadow-md" />
            <span className="text-2xl font-bold">{name}</span>
          </button>
        ))}
      </div>
      <div className="mt-6 flex space-x-6">
        {["Easy", "Medium", "Hard"].map((level) => (
          <button
            key={level}
            className={`px-6 py-3 text-xl rounded-full font-bold transition transform hover:scale-105 shadow-lg ${
              selectedDifficulty === level ? "bg-blue-600 text-white" : "bg-white text-gray-900"
            }`}
            onClick={() => setSelectedDifficulty(level)}
          >
            {level}
          </button>
        ))}
      </div>
      <button
        className={`mt-6 px-10 py-5 rounded-xl text-2xl font-bold transition transform hover:scale-110 shadow-2xl ${
          selectedSubject ? "bg-green-500 hover:bg-green-700 text-white" : "bg-gray-500 cursor-not-allowed"
        }`}
        disabled={!selectedSubject}
        onClick={handleStartQuiz}
      >
        Start Quiz 
      </button>
    </div>
  );
};

export default SubjectSelection;
