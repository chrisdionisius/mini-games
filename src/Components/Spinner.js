import React from "react";

class Spinner extends React.Component {
  constructor(props) {
    super(props);

    // Bind `forceUpdateHandler` to this instance of `Spinner`
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  // Define the `forceUpdateHandler` function
  forceUpdateHandler() {
    // Call the `reset` function to reset the spinner
    this.reset();
  }

  // Define the initial state of the spinner
  state = {
    position: 0,
    lastPosition: null,
  };

  // Define the height of each icon
  iconHeight = 188;

  // Generate a random speed multiplier between 1 and 3
  multiplier = Math.floor(Math.random() * (4 - 1) + 1);

  // Calculate the starting position of the spinner
  start = this.setStartPosition();

  // Calculate the speed of the spinner based on the multiplier and icon height
  speed = this.iconHeight * this.multiplier;

  // Calculate a random starting position for the spinner
  setStartPosition() {
    return Math.floor(Math.random() * 9) * this.iconHeight * -1;
  }

  // Move the background of the spinner to create the spinning effect
  moveBackground() {
    this.setState({
      position: this.state.position - this.speed,
      timeRemaining: this.state.timeRemaining - 100,
    });
  }

  // Get the symbol from the current position of the spinner
  getSymbolFromPosition() {
    const totalSymbols = 9;
    const maxPosition = this.iconHeight * (totalSymbols - 1) * -1;
    let moved = (this.props.timer / 100) * this.multiplier;
    let startPosition = this.start;
    let currentPosition = startPosition;

    for (let i = 0; i < moved; i++) {
      currentPosition -= this.iconHeight;

      if (currentPosition < maxPosition) {
        currentPosition = 0;
      }
    }

    // Call the `onFinish` function with the current position of the spinner
    this.props.onFinish(currentPosition);
  }

  // Update the spinner every 100 milliseconds
  tick() {
    if (this.state.timeRemaining <= 0) {
      clearInterval(this.timer);
      this.getSymbolFromPosition();
    } else {
      this.moveBackground();
    }
  }

  // When the component mounts, set the initial state of the spinner and start the timer
  componentDidMount() {
    clearInterval(this.timer);

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer,
    });

    this.timer = setInterval(() => {
      this.tick();
    }, 100);
  }

  // Reset the spinner to its initial state
  reset() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.start = this.setStartPosition();

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer,
    });

    this.timer = setInterval(() => {
      this.tick();
    }, 100);
  }

  // Render the spinner with its current position
  render() {
    let { position } = this.state;

    return (
      <div
        style={{ backgroundPosition: "0px " + position + "px" }}
        className={`icons`}
      />
    );
  }
}

export default Spinner;
