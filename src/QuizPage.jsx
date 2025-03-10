import React, { useState, useEffect } from "react";
import questionsData from "./questions.json";
import CharacterMascot from "./Character"; 
import SoundEffects from "./SoundEffects"; 
import WebcamUpload from "./WebCam";
import ScoreIcon from "./Score.gif";
import QuizGif from "./Quiz.gif";

const QuizPage = ({ subject, difficulty, onGameEnd }) => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [setShowResult] = useState(false);
    const [feedback, setFeedback] = useState("");
    useEffect(() => {
        if (questionsData[subject] && questionsData[subject][difficulty]) {
            setQuestions(questionsData[subject][difficulty]);
        }
    }, [subject, difficulty]);
    const handleAnswerClick = (option) => {
        setSelectedOption(option);
        let updatedScore = score;
        if (option === questions[currentIndex].correct) {
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
        <div className="quiz-container flex flex-col items-center justify-center h-screen w-[800px] bg-gradient-to-r from-pink-400 to-blue-400 text-white transition-all duration-500 relative">
            <img 
                src={QuizGif} 
                alt="Quiz Time" 
                className="absolute top-4 left-4 w-32 h-32 animate-pulse"
            />
            <div className="absolute top-4 right-4 flex items-center bg-white px-6 py-3 rounded-full shadow-lg text-black font-bold text-3xl border-4 border-yellow-400 animate-pulse">
                <img src={ScoreIcon} alt="Score" className="w-12 h-12 mr-3" />
                {score}
            </div>
            {questions.length > 0 ? (
                <>
                    <h2 className="text-5xl font-extrabold animate-pulse">🎈 Question {currentIndex + 1} of {questions.length}</h2>
                    <p className="text-3xl mt-6 bg-white text-black px-8 py-6 rounded-2xl shadow-xl">
                        {questions[currentIndex].question}
                    </p>
                    <div className="grid grid-cols-2 gap-6 mt-8">
                        {questions[currentIndex].options.map((option, index) => (
                            <button
                                key={index}
                                className={`p-6 rounded-full text-xl font-semibold transition-all duration-300 hover:scale-110 transform shadow-lg
                                    ${
                                        selectedOption === option 
                                            ? (option === questions[currentIndex].correct ? "bg-green-500" : "bg-red-500") 
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
