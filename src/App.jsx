import React, { useState } from "react";
import questions from "./questions.json";
import './App.css'

export default function App() {
  let [currentQIndex, setcurrentQIndex] = useState(0);
  let [selected, setSelected] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizDetails, setQuizDetails] = useState([]);

  const moveNext = () => {
    update();
    setcurrentQIndex(currentQIndex + 1);
    setSelected("");
  }

  const onOptionSelected = (selected) => {
    setSelected(selected);
  }

  const restart = () => {
    setcurrentQIndex(0);
    setScore(0);
    setQuizDetails([]); // Reset quiz details on restart
  }

  const showDetails = () => {
    setShowResult(true);
    setQuizDetails(questions.map((question, index) => ({
      question: question.statement,
      selectedAnswer: index < quizDetails.length ? quizDetails[index].selectedAnswer : 'Not Answered',
      correctAnswer: questions[index].options[questions[index].correctOptionIndex]
    })));
  }

 

  let update = () => {
    if (selected === questions[currentQIndex].correctOptionIndex) {
      setScore(score + 1);
    }
    setQuizDetails([...quizDetails, { selectedAnswer: selected }]);
  }

  if (currentQIndex === questions.length) {
    return (
      <div className="container align-items-center mt-4">
        <div className="text-center">
          <h2 className="font-weight-bold text-primary">Online Quiz</h2>
          <h2 className="text-danger">Ended</h2>
          <h3>Total Score: {score}/{questions.length}</h3>
          <button className="button" onClick={restart}>Restart</button>
          <button className="btn btn-primary" onClick={showDetails}>Details</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-6">
      <h1 className="display-4 font-weight-bold text-primary text-center">Online Quiz</h1>
      <div className="card mb-5">
        <div className="card-header">{questions[currentQIndex]?.statement}</div>
        <ul className="list-group list-flush">
          {questions[currentQIndex]?.options.map((option, index) =>
            <li className={selected === index ? "list-group-item active" : "list-group-item"} key={index} onClick={() => onOptionSelected(index)}>
              {option}
            </li>
          )}
        </ul>
      </div>
      <button onClick={moveNext} className="btn">Next</button>
    </div>
  );
}
