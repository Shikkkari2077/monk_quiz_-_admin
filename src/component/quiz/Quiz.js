import axios from "axios";
import React, { useState, useEffect } from "react";
import "./quiz.css";

export default function App() {
  const [questions, setQuestions] = useState([
    {
      Question: "",
      answerOptions: [
        {
          answerText: "",
          isCorrect: "",
        },
        {
          answerText: "",
          isCorrect: "",
        },
        {
          answerText: "",
          isCorrect: "",
        },
        {
          answerText: "",
          isCorrect: "",
        },
      ],
    },
  ]);

  useEffect(async () => {
    const result = await axios.get("http://localhost:3009/question");
    setQuestions(result.data);
  }, []);

  console.log(questions);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [showScore, setShowScore] = useState(false);

  const [score, setScore] = useState(0);

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect == true) {
      setScore(score + 10);
      console.log(score);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  localStorage.setItem("points", score);

  const reset = () => {
    setShowScore(false);
    setScore(0);
    setCurrentQuestion(0);
  };

  return (
    <div className="mainQuiz">
      <div className="quizContainer">
        {showScore ? (
          <div className="score-section">
            <span>You scored {score} out of {questions.length * 10}</span>
            <button onClick={reset}>Back to Quiz</button>
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>
                  Question. {currentQuestion + 1}/{questions.length}
                </span>
              </div>
              <div className="questionText">
                <span>#. {questions[currentQuestion].Question}</span>
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map((answerOption) => (
                <button
                  className="quizOptions"
                  onClick={() =>
                    handleAnswerButtonClick(answerOption.isCorrect)
                  }
                >
                  {answerOption.answerText}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
