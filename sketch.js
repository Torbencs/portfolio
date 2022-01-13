const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = (context, width, height) => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.lineWidth = 2;

    context.beginPath();
    context.strokeStyle = "black";
    context.filter = "blur(3px)";
    context.arc(width / 2, height / 2, 400, 0, Math.PI * 2);
    context.stroke();
    context.beginPath();
    context.strokeStyle = "black";
    context.filter = "none";
    context.filter = "blur(1px)";
    context.arc(width / 2, height / 2, 400, 0, Math.PI * 2);
    context.stroke();
  };
};

canvasSketch(sketch, settings);
