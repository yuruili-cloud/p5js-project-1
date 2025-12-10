

let trees = [];
let bugs = [];
let noiseTime = 0;

function setup() {
  createCanvas(800, 500);

  // create trees
  for (let i = 0; i < 10; i++) {
    trees.push(new Tree(random(width), height * 0.75));
  }

  // create bugs
  for (let i = 0; i < 35; i++) {
    bugs.push(new Bug());
  }
}

function draw() {
  drawSky();
  drawGround();

  // draw trees
  for (let t of trees) {
    t.show();
  }

  // draw fireflies
  for (let b of bugs) {
    b.update();
    b.show();
  }

  noiseTime += 0.003;
}

// --------------------------------------
// sky using noise
// --------------------------------------
function drawSky() {
  for (let y = 0; y < height; y++) {
    let n = noise(y * 0.01, noiseTime);
    let c = lerpColor(color(25, 30, 70), color(10, 10, 30), n);
    stroke(c);
    line(0, y, width, y);
  }
}

// --------------------------------------
// ground
// --------------------------------------
function drawGround() {
  noStroke();
  fill(25, 50, 25);
  rect(0, height * 0.75, width, height * 0.25);
}

// --------------------------------------
// Tree class
// --------------------------------------
class Tree {
  constructor(x, groundY) {
    this.x = x;
    this.baseY = groundY;
    this.h = random(120, 170);
    this.offset = random(1000);
  }

  show() {
    // trunk
    stroke(70, 45, 20);
    strokeWeight(7);
    line(this.x, this.baseY, this.x, this.baseY - this.h);

    // leaves
    noStroke();
    fill(30, 90, 40, 180);

    for (let i = 0; i < 30; i++) {
      let angle = noise(i * 0.1, this.offset + noiseTime) * TWO_PI;
      let r = 20 + noise(i * 0.15, noiseTime) * 25;

      let lx = this.x + cos(angle) * r;
      let ly = this.baseY - this.h + sin(angle) * r;

      ellipse(lx, ly, 18, 18);
    }
  }
}

// --------------------------------------
// Bug class
// --------------------------------------
class Bug {
  constructor() {
    this.nx = random(2000);
    this.ny = random(3000);
  }

  update() {
    this.x = noise(this.nx) * width;
    this.y = noise(this.ny) * height * 0.7;
    this.nx += 0.002;
    this.ny += 0.002;
  }

  show() {
    noStroke();
    fill(255, 255, 180, 200);
    ellipse(this.x, this.y, 4, 4);
  }
}







 
 



//circle() command makes a circle
//color is between 0-255