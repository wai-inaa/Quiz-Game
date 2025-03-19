import { useState } from "react";

const subjects = [
  { name: "English", gif: "/Gifs/English.gif" },
  { name: "Urdu", gif: "/Gifs/urdu.gif" },
  { name: "Math", gif: "/Gifs/Math.gif" },
  { name: "Drawing", gif: "/Gifs/Drawing.gif" },
  { name: "Science", gif: "/Gifs/Science.gif" }, 
];

const SubjectSelection = ({ onSelect, onBack }) => {
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
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400 text-white relative overflow-hidden p-4">
      <img src="/Gifs/Fun.gif" alt="Fun" className="w-40 h-40 absolute top-6 right-6 animate-bounce" />
      <img src="/Gifs/teacher.gif" alt="Teacher" className="w-40 h-40 absolute bottom-8 left-8 animate-spin-slow" />
      <img src="/Gifs/Go.gif" alt="LetsGo" className="w-40 h-40 absolute bottom-10 right-12 animate-pulse" />
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
      <button 
        className="mt-8 flex items-center bg-blue-600 hover:bg-blue-800 text-white text-xl font-bold px-6 py-3 rounded-full shadow-xl transition-transform transform hover:scale-110"
        onClick={onBack}
      >
        <img src="/png/back.png" alt="Back" className="w-8 h-8 mr-2" />
        Back to Main Menu
      </button>
    </div>
  );
};

export default SubjectSelection;
