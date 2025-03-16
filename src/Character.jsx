import { useState, useEffect } from "react";

const CharacterMascot = ({ feedback }) => {
  const [characterImage, setCharacterImage] = useState("/Gifs/idle.gif");
  useEffect(() => {
    if (feedback.includes("✅")) {
      setCharacterImage("/Gifs/happy.gif");
    } else if (feedback.includes("❌")) {
      setCharacterImage("/Gifs/sad.gif");
    } else {
      setCharacterImage("/Gifs/idle.gif");
    }
  }, [feedback]);
  return (
    <div className="fixed bottom-8 left-8 flex flex-col items-center transition-all duration-500">
      <img 
        src={characterImage} 
        alt="Character" 
        className="w-40 h-40 animate-bounce"
      />
      <p className="text-black text-center bg-white px-4 py-2 rounded-lg mt-2 font-bold shadow-md">
        {feedback || "Let's do your best! 🎮"}
      </p>
    </div>
  );
};
export default CharacterMascot;
