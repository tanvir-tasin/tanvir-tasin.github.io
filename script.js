const canvas = document.getElementById('lightCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let lines = [];

function resizeCanvas() {
  width = canvas.offsetWidth;
  height = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const config = {
  lineCount: 250,
  minLength: 50,
  maxLength: 200,
  minSpeed: 3,
  maxSpeed: 10
};

function initLines() {
  lines = [];
  for (let i = 0; i < config.lineCount; i++) {
    lines.push({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * (config.maxLength - config.minLength) + config.minLength,
      speed: Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed,
      opacity: Math.random() * 0.4 + 0.1,
      width: Math.random() * 1.5 + 0.5
    });
  }
}

initLines();

function animate() {
  ctx.clearRect(0, 0, width, height);

  lines.forEach(line => {
    let gradient = ctx.createLinearGradient(line.x, line.y - line.length, line.x, line.y);
    gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
    gradient.addColorStop(1, `rgba(255, 255, 255, ${line.opacity})`);

    ctx.beginPath();
    ctx.moveTo(line.x, line.y - line.length);
    ctx.lineTo(line.x, line.y);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = line.width;
    ctx.stroke();

    line.y += line.speed;

    if (line.y - line.length > height) {
      line.y = 0;
      line.x = Math.random() * width;
    }
  });

  requestAnimationFrame(animate);
}

animate();
