/**  @type {HTMLCanvasElement}  */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_HEIGHT = (canvas.height = 600);
const CANVAS_WIDTH = (canvas.width = 500);
const canvasPosition = canvas.getBoundingClientRect();

const explosions = [];

const explotionTypes = [
  {
    imageSrc: "boom.png",
    totalFrames: 5,
    spriteHeight: 179,
    spriteWidth: 200,
    soundSrc: "boom.wav",
    speed: 10,
  },
  {
    imageSrc: "ice.png",
    totalFrames: 10,
    spriteHeight: 258,
    spriteWidth: 258,
    soundSrc: "ice.wav",
    speed: 5,
  },
  {
    imageSrc: "gas.png",
    totalFrames: 9,
    spriteHeight: 258,
    spriteWidth: 258,
    soundSrc: "gas.mp3",
    speed: 5,
  },
];

class Explosion {
  constructor(x, y) {
    this.explosionType = explotionTypes[Math.floor(Math.random() * 3)];
    this.spriteWidth = this.explosionType.spriteWidth;
    this.spriteHeight = this.explosionType.spriteHeight;
    this.width = this.spriteWidth * 0.8;
    this.height = this.spriteHeight * 0.8;
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.image = new Image();
    this.image.src = this.explosionType.imageSrc;
    this.sound = new Audio();
    this.sound.src = this.explosionType.soundSrc;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
  }

  update() {
    this.timer++;
    if (this.frame === 0) this.sound.play();
    if (this.timer % this.explosionType.speed === 0) this.frame++;
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
    if (
      explosions[index].frame >= explosions[index].explosionType.totalFrames
    ) {
      explosions.splice(index, 1);
      index--;
    }
  }
  requestAnimationFrame(animate);
}

animate();
