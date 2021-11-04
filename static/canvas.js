const canvas = document.querySelector("canvas");
const resultContainer = document.getElementById("result");
let context = canvas.getContext("2d");
socket = io("http://localhost:3000");

/**
 * updates wolf on canvas
 * @param wolf
 */
const updateWolf = (wolf) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.fillStyle = "red";
  context.arc(wolf._position._x, wolf._position._y, wolf._size, 0, 2 * Math.PI, false);
  context.fill();
  context.lineWidth = 1;
  context.stroke();
};

/**
 * updates sheeps on canvas
 * @param sheeps
 */
const updateSheeps = (sheeps) => {
  context.fillStyle = "blue";
  context.lineWidth = 1;
  context.strokeStyle = "#092c9d";
  for (let sheep of sheeps) {
    context.fillRect(sheep._position._x, sheep._position._y, 10, 10);
  }
};

socket.on("wolf", (wolf) => {
  updateWolf(wolf);
});

socket.on("sheeps", (sheeps) => {
  updateSheeps(sheeps);
});

socket.on("end", () => {
  resultContainer.insertAdjacentHTML("afterbegin", `
  <h1>All the sheepoos are dead:(</h1>
  `);
});

canvas.width = 610;
canvas.height = 610;
