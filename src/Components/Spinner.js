import React, {
  useEffect,
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from "react";

const Spinner = forwardRef((props, ref) => {
  const [state, setState] = useState({
    position: 0,
    lastPosition: null,
    timeRemaining: props.timer,
  });

  useImperativeHandle(ref, () => ({
    reset() {
      setState({
        position: start(),
        lastPosition: null,
        timeRemaining: props.timer,
      });
    },
  }));
  // Define the height of each icon
  const iconHeight = 188;

  // Generate a random speed multiplier between 1 and 3
  const multiplier = Math.floor(Math.random() * 3 + 1);

  // Calculate the starting position of the spinner
  const start = useCallback(() => {
    return Math.floor(Math.random() * 9) * iconHeight * -1;
  }, [iconHeight]);

  // Calculate the speed of the spinner based on the multiplier and icon height
  const speed = iconHeight * multiplier;

  // Move the background of the spinner to create the spinning effect
  const moveBackground = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      position: prevState.position - speed,
      timeRemaining: prevState.timeRemaining - 100,
    }));
  }, [speed]);

  // Get the symbol from the current position of the spinner
  const getSymbolFromPosition = useCallback(() => {
    const totalSymbols = 9;
    const maxPosition = iconHeight * (totalSymbols - 1) * -1;
    let moved = (props.timer / 100) * multiplier;
    let startPosition = start();
    let currentPosition = startPosition;

    for (let i = 0; i < moved; i++) {
      currentPosition -= iconHeight;

      if (currentPosition < maxPosition) {
        currentPosition = 0;
      }
    }

    // Call the `onFinish` function with the current position of the spinner
    props.onFinish(currentPosition);
  }, [props, multiplier, iconHeight, start]);

  // Update the spinner every 100 milliseconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (state.timeRemaining <= 0) {
        clearInterval(timer);
        getSymbolFromPosition();
      } else {
        moveBackground();
      }
    }, 100);

    return () => clearInterval(timer);
  }, [state.timeRemaining, moveBackground, getSymbolFromPosition]);

  // Render the spinner with its current position
  return (
    <div
      style={{ backgroundPosition: "0px " + state.position + "px" }}
      className={`icons`}
    />
  );
});

export default Spinner;
