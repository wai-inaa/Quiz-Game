import { useState, useEffect } from "react";
import IdleGif from "./idle.gif";    
import HappyGif from "./happy.gif";
import SadGif from "./sad.gif";     

const CharacterMascot = ({ feedback }) => {
  const [characterImage, setCharacterImage] = useState(IdleGif);
  useEffect(() => {
    if (feedback.includes("✅")) {
      setCharacterImage(HappyGif);
    } else if (feedback.includes("❌")) {
      setCharacterImage(SadGif);
    } else {
      setCharacterImage(IdleGif);
    }
  }, [feedback]);
  return (
    <div className="fixed bottom-8 left-8 flex flex-col items-center transition-all duration-500">
      <img 
        src={characterImage} 
        alt="Mascot" 
        className="w-40 h-40 animate-bounce"
      />
      <p className="text-black text-center bg-white px-4 py-2 rounded-lg mt-2 font-bold shadow-md">
        {feedback || "Let's do your best! 🎮"}
      </p>
    </div>
  );
};
export default CharacterMascot;
