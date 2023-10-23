/**  @type {HTMLCanvasElement}  */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_HEIGHT = (canvas.height = 600);
const CANVAS_WIDTH = (canvas.width = 500);
const canvasPosition = canvas.getBoundingClientRect();

const explosions = [];

class Explosion {
  constructor(x, y) {
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.image = new Image();
    this.image.src = "boom.png";
    this.sound = new Audio();
    this.sound.src = "boom.wav";
    this.timer = 0;
    this.angle = Math.random() * 6.2;
  }

  update() {
    this.timer++;
    if (this.frame === 0) this.sound.play();
    if (this.timer % 10 === 0) this.frame++;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      0 - this.width / 2,
      0 - this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }
}

canvas.addEventListener("click", (e) => {
  explosions.push(
    new Explosion(e.x - canvasPosition.left, e.y - canvasPosition.top)
  );
});
// canvas.addEventListener("mousemove", (e) => {
//   explosions.push(
//     new Explosion(e.x - canvasPosition.left, e.y - canvasPosition.top)
//   );
// });

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (let index = 0; index < explosions.length; index++) {
    explosions[index].update();
    explosions[index].draw();
    if (explosions[index].frame >= 6) {
      explosions.splice(index, 1);
      index--;
    }
  }
  requestAnimationFrame(animate);
}

animate();
