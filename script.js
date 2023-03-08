window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  document.getElementById("reset-btn").addEventListener("click", resetCanvas);
  document
    .getElementById("line-width-slider")
    .addEventListener("change", changeLineWidth);

  const ctx = canvas.getContext("2d");

  // Resizing
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  // Variables
  let painting = false;
  let lineWidth = 5;
  let strokeColor = "black";
  let eraser = false;

  function startPosition(e) {
    painting = true;
    draw(e);
  }

  function finishedPosition() {
    painting = false;
    ctx.beginPath();
  }

  function draw(e) {
    if (!painting) return;

    //lineWidth determines the width of the line
    ctx.lineWidth = lineWidth;

    //lineCap determines the shape used to draw the end points of lines
    ctx.lineCap = "round";

    if (eraser) {
      // Set stroke color to white for eraser mode
      ctx.strokeStyle = "white";

      // Clear the area under the mouse cursor
      ctx.clearRect(
        e.clientX - lineWidth / 2,
        e.clientY - lineWidth / 2,
        lineWidth,
        lineWidth
      );
    } else {
      // Set stroke color to selected color for drawing mode
      ctx.strokeStyle = strokeColor;

      //draw a line segment on the canvas between the previous mouse position and the current mouse position
      ctx.lineTo(e.clientX, e.clientY);

      //draws the line
      ctx.stroke();

      //begins a new path by emptying the list of sub-paths
      ctx.beginPath();

      ctx.moveTo(e.clientX, e.clientY);
    }
  }

  function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    painting = false;
  }

  function changeLineWidth() {
    lineWidth = document.getElementById("line-width-slider").value;
  }

  // Event Listeners
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", finishedPosition);
  canvas.addEventListener("mousemove", draw);

  // Add event listener to eraser button to activate eraser mode
  document.getElementById("eraser-btn").addEventListener("click", () => {
    eraser = true;
  });

  // Add event listener to color buttons to deactivate eraser mode
  document.querySelectorAll(".color").forEach((color) => {
    color.addEventListener("click", () => {
      eraser = false;
      strokeColor = color.style.backgroundColor;
    });
  });
});
