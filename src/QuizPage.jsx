import React, { useState, useEffect } from "react";
import CharacterMascot from "./Character";
import SoundEffects from "./SoundEffects";
import WebcamUpload from "./WebCam";
const QuizPage = ({ subject, difficulty, onGameEnd }) => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        fetch("/questions.json")
            .then((response) => response.json())
            .then((data) => {
                if (data[subject] && data[subject][difficulty]) {
                    setQuestions(data[subject][difficulty]);
                } else {
                    setQuestions([]);
                }
            })
            .catch((error) => console.error("Error fetching questions:", error));
    }, [subject, difficulty]);

    const handleAnswerClick = (option) => {
        setSelectedOption(option);
        let updatedScore = score;

        if (questions[currentIndex]?.correct === option) {
            updatedScore += 10;
            setScore(updatedScore);
            setFeedback("✅ Great Job! 🎉");
            SoundEffects.playCorrect();
        } else {
            setFeedback("❌ Oops! Try again.");
            SoundEffects.playWrong();
        }

        setTimeout(() => {
            setFeedback(""); 
            if (currentIndex + 1 < questions.length) {
                setCurrentIndex((prevIndex) => prevIndex + 1);
                setSelectedOption(null);
            } else {
                setShowResult(true);
                onGameEnd(updatedScore);
            }
        }, 2500);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-r from-pink-400 to-blue-400 text-white transition-all duration-500 relative p-4 overflow-hidden">
            <div className="absolute top-6 right-6 flex items-center bg-white px-6 py-3 rounded-full shadow-lg text-black font-bold text-3xl border-4 border-yellow-400 animate-pulse">
                <img src="/Gifs/Score.gif" alt="Score" className="w-20 h-20" />
                {score}
            </div>
            <img src="/Gifs/Quiz.gif" alt="Quiz " className="absolute top-8 left-4 w-24 md:w-40 h-24 md:h-40 animate-pulse" />
            <img src="/Gifs/Thinking.gif" alt="thinking" className="absolute bottom-6 right-6 w-24 md:w-40 h-24 md:h-40" />

            {questions.length > 0 && questions[currentIndex] ? (
                <>
                    <h2 className="text-4xl md:text-5xl font-extrabold animate-pulse text-center">
                        Question {currentIndex + 1} of {questions.length}
                    </h2>
                    <p className="text-2xl md:text-3xl mt-6 bg-white text-black px-8 py-6 rounded-2xl shadow-xl w-[90%] md:w-3/4 text-center">
                        {questions[currentIndex]?.question ?? "Loading..."}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 w-[90%] md:w-2/3">
                        {questions[currentIndex]?.options?.map((option, index) => (
                            <button
                                key={index}
                                className={`p-5 md:p-6 rounded-xl text-lg md:text-xl font-semibold transition-all duration-300 hover:scale-110 transform shadow-lg text-center
                                    ${
                                        selectedOption === option 
                                            ? (option === questions[currentIndex]?.correct ? "bg-green-500" : "bg-red-500") 
                                            : "bg-yellow-400 hover:bg-yellow-500"
                                    }`}
                                onClick={() => handleAnswerClick(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    <div className="mt-6">
                        {feedback && (
                            <div className="text-2xl font-bold animate-bounce">{feedback}</div>
                        )}
                    </div>
                    <CharacterMascot feedback={feedback} />
                    <div className="mt-6 flex flex-col items-center">
                        <WebcamUpload />
                    </div>
                </>
            ) : (
                <p className="text-2xl animate-pulse">⏳ Loading questions...</p>
            )}
        </div>
    );
};
export default QuizPage;
