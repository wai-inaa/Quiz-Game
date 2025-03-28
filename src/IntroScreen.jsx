import { useState } from "react";
const IntroScreen = ({ onStart }) => {
const [userType, setUserType] = useState("");
const [playerName, setPlayerName] = useState("");
return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-r from-yellow-200 via-pink-300 to-blue-300 text-white p-6 relative overflow-hidden">
      <div className="flex items-center justify-center w-full animate-fade-in">
        <img src="/Gifs/Welcome.gif" alt="Welcome" className="w-[25%] md:w-[20%] lg:w-[15%] mx-4 bounce" />
        <h1 className="text-3xl md:text-5xl font-bold text-center bg-white text-blue-600 px-6 py-3 rounded-2xl shadow-lg transform hover:scale-110 transition">
          Welcome to the Quiz!
        </h1>
        <img src="/Gifs/Students.gif" alt="Students" className="w-[25%] md:w-[20%] lg:w-[15%] mx-4 bounce" />
      </div>
      <img src="/Gifs/Alphabet.gif" alt="Alphabet" className="w-[20%] md:w-[15%] absolute bottom-8 left-2 animate-spin-slow" />
      <img src="/Gifs/Numbers.gif" alt="Numbers" className="w-[20%] md:w-[15%] absolute bottom-8 right-2 animate-spin-slow" />
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl text-gray-800 w-[90%] md:w-[60%] lg:w-[40%] flex flex-col items-center mt-6 animate-slide-up">
        <label className="text-xl font-bold mb-2">Enter Your Name:</label>
        <input
          type="text"
          placeholder="Your Name"
          className="border-2 border-blue-400 px-3 py-2 rounded-lg w-full text-center text-lg"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <label className="text-xl font-bold mt-4">Select User Type:</label>
        <div className="flex space-x-6 mt-3">
          <button
            className={`px-5 py-3 rounded-lg text-white text-lg transition transform hover:scale-110 ${
              userType === "Student" ? "bg-blue-500 shadow-lg" : "bg-gray-400"
            }`}
            onClick={() => setUserType("Student")}
          >
            Student
          </button>
          <button
            className={`px-5 py-3 rounded-lg text-white text-lg transition transform hover:scale-110 ${
              userType === "Parent" ? "bg-green-500 shadow-lg" : "bg-gray-400"
            }`}
            onClick={() => setUserType("Parent")}
          >
            Parent
          </button>
        </div>
        {userType === "Student" && (
          <button
            className="mt-6 bg-purple-500 px-8 py-4 rounded-xl text-lg text-white shadow-lg hover:bg-purple-700 hover:scale-110 transition"
            onClick={() => playerName ? onStart(userType, playerName) : alert("Please enter your name!")}
          >
            Start Quiz 
          </button>
        )}

        {userType === "Parent" && (
          <button
            className="mt-6 bg-green-600 px-8 py-4 rounded-xl text-lg text-white shadow-lg hover:bg-green-800 hover:scale-110 transition"
            onClick={() => playerName ? onStart(userType, playerName) : alert("Please enter your name!")}
          >
            See Results & Progress
          </button>
        )}
      </div>
    </div>
  );
};
export default IntroScreen;
