import React, { useState, useRef } from "react";
import Spinner from "./Components/Spinner";
import RepeatButton from "./Components/RepeatButton";
import WinningSound from "./Components/WinningSound";
import "./App.css";
const loser = [
  "Not quite",
  "Stop gambling",
  "Hey, you lost!",
  "Ouch! I felt that",
  "Don't beat yourself up",
  "There goes the college fund",
  "I have a cat. You have a loss",
  "You're awesome at losing",
  "Coding is hard",
  "Don't hate the coder",
];
function App() {
  const [winner, setWinner] = useState(null);
  const child1Ref = useRef();
  const child2Ref = useRef();
  const child3Ref = useRef();

  const handleClick = () => {
    setWinner(null);
    emptyArray();
    child1Ref.current.reset();
    child2Ref.current.reset();
    child3Ref.current.reset();
  };

  let matches = [];

  const finishHandler = (value) => {
    matches.push(value);

    if (matches.length === 3) {
      const first = matches[0];
      const results = matches.every((match) => match === first);
      setWinner(results);
    }
  };

  const emptyArray = () => {
    matches = [];
  };

  const getLoser = () => {
    return loser[Math.floor(Math.random() * loser.length)];
  };

  let repeatButton = null;
  let winningSound = null;

  if (winner !== null) {
    repeatButton = <RepeatButton onClick={handleClick} />;
  }

  if (winner) {
    winningSound = <WinningSound />;
  }

  return (
    <div>
      {winningSound}
      <h1 style={{ color: "white" }}>
        <span>
          {winner === null
            ? "Waiting…"
            : winner
            ? "🤑 Pure skill! 🤑"
            : getLoser()}
        </span>
      </h1>

      <div className={`spinner-container`}>
        <Spinner onFinish={finishHandler} ref={child1Ref} timer="1000" />
        <Spinner onFinish={finishHandler} ref={child2Ref} timer="1400" />
        <Spinner onFinish={finishHandler} ref={child3Ref} timer="2200" />
        <div className="gradient-fade"></div>
      </div>
      {repeatButton}
    </div>
  );
}

export default App;
