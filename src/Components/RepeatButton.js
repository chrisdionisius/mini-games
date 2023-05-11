import React from "react";

export default function RepeatButton(props) {
  return (
    <button
      aria-label="Play again."
      id="repeatButton"
      onClick={props.onClick}
    ></button>
  );
}
