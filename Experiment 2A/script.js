const SVG_NS = "http://www.w3.org/2000/svg";
const svg = document.getElementById("canvas");
const colorPicker = document.getElementById("colorPicker");
const undoBtn = document.getElementById("undoBtn");
const clearBtn = document.getElementById("clearBtn");

let isDrawing = false;
let start = { x: 0, y: 0 };
let currentCircle = null;
const stack = [];

function getSvgPoint(clientX, clientY) {
  const rect = svg.getBoundingClientRect();
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}

svg.addEventListener("mousedown", (e) => {
  const p = getSvgPoint(e.clientX, e.clientY);
  isDrawing = true;
  start = p;
  currentCircle = document.createElementNS(SVG_NS, "circle");
  currentCircle.setAttribute("cx", start.x);
  currentCircle.setAttribute("cy", start.y);
  currentCircle.setAttribute("r", 0);
  currentCircle.setAttribute("fill", colorPicker.value);
  currentCircle.setAttribute("stroke", "none");
  svg.appendChild(currentCircle);
});

svg.addEventListener("mousemove", (e) => {
  if (!isDrawing || !currentCircle) return;
  const p = getSvgPoint(e.clientX, e.clientY);
  const dx = p.x - start.x;
  const dy = p.y - start.y;
  const r = Math.sqrt(dx * dx + dy * dy);
  currentCircle.setAttribute("r", r);
});

function finishDrawing() {
  if (!isDrawing) return;
  isDrawing = false;
  if (!currentCircle) return;
  let r = parseFloat(currentCircle.getAttribute("r"));
  if (r < 2) {
    currentCircle.setAttribute("r", 6);
  }
  stack.push(currentCircle);
  currentCircle = null;
}

svg.addEventListener("mouseup", finishDrawing);
svg.addEventListener("mouseleave", finishDrawing);

undoBtn.addEventListener("click", () => {
  const last = stack.pop();
  if (last) last.remove();
});

clearBtn.addEventListener("click", () => {
  while (stack.length) {
    const el = stack.pop();
    el.remove();
  }
});
