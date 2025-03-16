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
        const fetchQuestions = async () => {
            try {
                const response = await fetch("/questions.json");
                if (!response.ok) throw new Error("Failed to load questions");
                const data = await response.json();

                console.log("Fetched Questions:", data);
                if (data[subject] && data[subject][difficulty]) {
                    setQuestions(data[subject][difficulty]);
                } else {
                    setQuestions([]);
                }
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, [subject, difficulty]);

    const handleAnswerClick = (option) => {
        setSelectedOption(option);
        let updatedScore = score;

        if (questions[currentIndex] && option === questions[currentIndex].correct) {
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
        }, 1200);
    };

    return (
        <div className="quiz-container flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-r from-pink-400 to-blue-400 text-white transition-all duration-500 relative overflow-y-auto">
            <img 
                src="/Gifs/Quiz.gif" 
                alt="Quiz " 
                className="absolute top-4 left-4 w-40 h-40 animate-pulse"
            />

            <img src="/Gifs/Thinking.gif" alt="thinking" 
            className="absolute bottom-4 right-4 w-40 h-40"
            />

            <div className="absolute top-4 right-4 flex items-center bg-white px-6 py-3 rounded-full shadow-lg text-black font-bold text-3xl border-4 border-yellow-400 animate-pulse">
                <img src="/Gifs/Score.gif" alt="Score" className="w-20 h-20 mr-3" />
                {score}
            </div>
            {questions.length > 0 && questions[currentIndex] ? (
                <>
                    <h2 className="text-5xl font-extrabold animate-pulse">
                        Question {currentIndex + 1} of {questions.length}
                    </h2>
                    <p className="text-3xl mt-6 bg-white text-black px-8 py-6 rounded-2xl shadow-xl">
                        {questions[currentIndex]?.question ?? "Loading..."}
                    </p>

                    <div className="grid grid-cols-2 gap-6 mt-8">
                        {questions[currentIndex]?.options?.map((option, index) => (
                            <button
                                key={index}
                                className={`p-6 rounded-full text-xl font-semibold transition-all duration-300 hover:scale-110 transform shadow-lg
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
