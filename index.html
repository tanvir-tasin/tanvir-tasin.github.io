const canvas = document.getElementById('lightCanvas');
const ctx = canvas.getContext('2d', { alpha: false }); // Optimize performance

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

// Configuration tuned to match the video's motion
const config = {
  lineCount: 800, // Massive increase in density
  minLength: 150,
  maxLength: 500, // Longer trails
  minSpeed: 6,
  maxSpeed: 18,   // Faster falling motion
  baseOpacity: 0.15
};

class LightLine {
  constructor() {
    this.reset(true);
  }

  reset(randomizeY = false) {
    this.x = Math.random() * width;
    // If randomizing Y, spawn anywhere. Otherwise, spawn at the top.
    this.y = randomizeY ? Math.random() * height : -config.maxLength;
    this.length = Math.random() * (config.maxLength - config.minLength) + config.minLength;
    this.speed = Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed;
    this.opacity = Math.random() * config.baseOpacity + 0.05;
    this.width = Math.random() * 1.2 + 0.3; // Very thin lines
  }

  update() {
    this.y += this.speed;
    // Reset when the entire line has fallen past the bottom of the screen
    if (this.y - this.length > height) {
      this.reset();
    }
  }

  draw(ctx) {
    // Gradient creates the fading trail effect
    let gradient = ctx.createLinearGradient(this.x, this.y - this.length, this.x, this.y);
    gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
    gradient.addColorStop(1, `rgba(255, 255, 255, ${this.opacity})`);

    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.length);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = this.width;
    ctx.stroke();
  }
}

function initLines() {
  lines = [];
  for (let i = 0; i < config.lineCount; i++) {
    lines.push(new LightLine());
  }
}

initLines();

function animate() {
  // Clear the canvas. The CSS background shows through because we don't fill a solid color here.
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < lines.length; i++) {
    lines[i].update();
    lines[i].draw(ctx);
  }

  requestAnimationFrame(animate);
}

animate();
