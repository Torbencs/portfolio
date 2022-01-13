const Timer = () => {
  let interval;
  return {
    startTime: new Date(),
    elapsedTime: 0,

    start: function () {
      interval = setInterval(() => {
        this.elapsedTime = new Date() - this.startTime;
      }, 100);
    },
    reset: function () {
      this.startTime = new Date();
    },
    stop: () => {
      clearInterval(interval);
    },
  };
};

export default Timer;
