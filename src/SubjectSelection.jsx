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
      <img src="/Gifs/Fun.gif" alt="Fun" className="w-[18%] md:w-[14%] lg:w-[10%] absolute top-6 right-6 animate-bounce" />
      <img src="/Gifs/teacher.gif" alt="Teacher" className="w-[18%] md:w-[14%] lg:w-[10%] absolute bottom-8 left-8 animate-spin-slow" />
      <img src="/Gifs/Go.gif" alt="LetsGo" className="w-[18%] md:w-[14%] lg:w-[10%] absolute bottom-10 right-12 animate-pulse" />
      
      <h1 className="text-3xl md:text-5xl font-extrabold bg-white text-purple-600 px-6 py-3 rounded-3xl shadow-lg text-center">
        Select Subject & Difficulty Level
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
        {subjects.map(({ name, gif }) => (
          <button
            key={name}
            className={`flex flex-col items-center p-6 rounded-2xl transition transform hover:scale-110 shadow-2xl ${
              selectedSubject === name ? "bg-green-600 text-white" : "bg-white text-gray-900"
            }`}
            onClick={() => setSelectedSubject(name)}
          >
            <img 
              src={gif} 
              alt={name} 
              className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] object-cover rounded-full shadow-md border-4 border-gray-200"
            />
            <span className="text-lg md:text-2xl font-bold">{name}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex space-x-4 md:space-x-6">
        {["Easy", "Medium", "Hard"].map((level) => (
          <button
            key={level}
            className={`px-6 py-3 text-lg md:text-xl rounded-full font-bold transition transform hover:scale-105 shadow-lg ${
              selectedDifficulty === level ? "bg-blue-600 text-white" : "bg-white text-gray-900"
            }`}
            onClick={() => setSelectedDifficulty(level)}
          >
            {level}
          </button>
        ))}
      </div>

      <button
        className={`mt-6 px-8 py-4 rounded-xl text-lg md:text-2xl font-bold transition transform hover:scale-110 shadow-2xl ${
          selectedSubject ? "bg-green-500 hover:bg-green-700 text-white" : "bg-gray-500 cursor-not-allowed"
        }`}
        disabled={!selectedSubject}
        onClick={handleStartQuiz}
      >
        Start Quiz 
      </button>
      <button 
        className="mt-6 flex items-center bg-blue-600 hover:bg-blue-800 text-white text-lg md:text-xl font-bold px-6 py-3 rounded-full shadow-xl transition-transform transform hover:scale-110"
        onClick={onBack} 
      >
        <img src="/png/back.png" alt="Back" className="w-6 md:w-8 h-6 md:h-8 mr-2" />
        Back to Main Menu
      </button>
    </div>
  );
};
export default SubjectSelection;
