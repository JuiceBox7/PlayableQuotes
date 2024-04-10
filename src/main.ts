import "./style.css";

// -- Setup --

const app: HTMLDivElement = document.querySelector("#app")!;
document.title = "RotatingTriangle";

// -- Consts --

const MAX_CANVAS_WIDTH = 600;
const MAX_CANVAS_HEIGHT = 600;

// -- Triangle --

class RotatingTriangle {
  ctx: CanvasRenderingContext2D;
  angle: number = 1;
  width: number;
  height: number;
  color: string = "#ffffff";
  scale: number = 3;
  speed: number = 1.5;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  draw(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.translate(this.width / 2, this.height / 2);
    this.ctx.rotate((this.angle * Math.PI) / 180);
    this.ctx.scale(this.scale, this.scale);
    this.ctx.translate(-this.width / 2, -this.height / 2);

    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 2, this.height / 2 - 50);
    this.ctx.lineTo(this.width / 2 - 50, this.height / 2 + 50);
    this.ctx.lineTo(this.width / 2 + 50, this.height / 2 + 50);
    this.ctx.closePath();

    this.ctx.lineWidth = 5;
    this.ctx.stroke();


    this.setFill(this.color);

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.angle += this.speed;
  }

  animate():void {
    requestAnimationFrame(() => this.animate());
    this.draw();
  }

  setFill(color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }

  setColor(color: string): void {
    this.color = color;
  }

  increaseScale(): void {
    if (this.scale <= 4) this.scale += 0.1;
  }

  decreaseScale(): void {
    if (this.scale >=2) this.scale -= 0.1;
  }

  changeSpeed(speed: number): void {
    this.speed = speed;
  }
}

// -- Canvas --

const canvas = document.createElement("canvas");
canvas.width = MAX_CANVAS_WIDTH;
canvas.height = MAX_CANVAS_HEIGHT;
const triangle = new RotatingTriangle(canvas);
triangle.animate();
app.append(canvas);
app.append(document.createElement("br"));

// -- Buttons --  

const scaleUpBtn = document.createElement("button");
scaleUpBtn.innerHTML = "+";
app.append(scaleUpBtn);

const scaleDownBtn = document.createElement("button");
scaleDownBtn.innerHTML = "-";
app.append(scaleDownBtn);

app.append(document.createElement("br"));

const colorInput = document.createElement("input");
colorInput.type = "color";
colorInput.value = "#ffffff"
app.append(colorInput);

const slowBtn = document.getElementById("slow-btn")!;
const mediumBtn = document.getElementById("medium-btn")!;
const fastBtn = document.getElementById("fast-btn")!;

// -- Listeners

scaleUpBtn.addEventListener("click", () => triangle.increaseScale());
scaleDownBtn.addEventListener("click", () => triangle.decreaseScale());

colorInput.addEventListener("input", (e) => {
  if (e.target instanceof HTMLInputElement) triangle.setColor(e.target.value);
});

slowBtn.addEventListener("click", () => triangle.changeSpeed(1));
mediumBtn.addEventListener("click", () => triangle.changeSpeed(1.5));
fastBtn.addEventListener("click", () => triangle.changeSpeed(2));