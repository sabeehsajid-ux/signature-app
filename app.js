const canvas = document.getElementById("signatureCanvas");
const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("colorPicker");
const sizePicker = document.getElementById("sizePicker");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let drawing = false;
let penColor = colorPicker.value;
let penSize = sizePicker.value;
let showHint = true;

// Pencil icon
const pencil = new Image();
pencil.src = "https://cdn-icons-png.flaticon.com/512/1827/1827933.png";

// Draw hint
function drawHint() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(pencil, canvas.width / 2 - 20, canvas.height / 2 - 25, 40, 40);
  ctx.font = "14px Arial";
  ctx.fillStyle = "#777";
  ctx.fillText("Sign here", canvas.width / 2 - 30, canvas.height / 2 + 30);
}

pencil.onload = drawHint;

// Helpers
function getX(e) {
  return (e.touches ? e.touches[0].clientX : e.clientX) -
         canvas.getBoundingClientRect().left;
}

function getY(e) {
  return (e.touches ? e.touches[0].clientY : e.clientY) -
         canvas.getBoundingClientRect().top;
}

// Start drawing
function startDraw(e) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(getX(e), getY(e));

  if (showHint) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    showHint = false;
  }
}

// Draw
function draw(e) {
  if (!drawing) return;

  ctx.lineWidth = penSize;
  ctx.lineCap = "round";
  ctx.strokeStyle = penColor;

  ctx.lineTo(getX(e), getY(e));
  ctx.stroke();
}

// Stop drawing
function stopDraw() {
  drawing = false;
}

// Mouse events
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseleave", stopDraw);

// Touch events
canvas.addEventListener("touchstart", startDraw);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDraw);

// Controls
colorPicker.addEventListener("input", e => penColor = e.target.value);
sizePicker.addEventListener("input", e => penSize = e.target.value);

// Clear
document.getElementById("clear").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  showHint = true;
  drawHint();
});

// Save
document.getElementById("save").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "signature.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
