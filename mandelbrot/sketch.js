// ==========================================================================
// | Mandelbrot
// | https://www.youtube.com/watch?v=qhbuKbxJsk8

//config
var change_limit = 3;
var split_points = 200;
var increment = 0.05;
var r = 290;
var range = [2, 10];

// point container
var points = [];

function setup() {
  // canvas setup
  createCanvas(600, 600);
  pixelDensity(1);
  colorMode(RGB);

  // pre load points
  var a = TWO_PI / split_points;
  for (var i = 0; i < split_points; i++) {
    points.push([
      r * cos(a * i) + width / 2,
      r * sin(a * i) + height / 2
    ])
  }
}

// frame counter
var counter = 0;

var reverse = false;

// def step
var step = range[0];

function draw() {
  background(255, 255, 255);
  counter++;

  // draw circle
  push();
  ellipse(width / 2, height / 2, r * 2);
  noFill();
  strokeWeight(1);
  stroke(0, 0, 0);
  pop();

  // draw points and lines between them
  for (var i in points) {
    var index = i * step;
    while ((index - points.length) >= 0) {
      index -= points.length;
    }
    index = floor(index);
    ellipse(points[i][0], points[i][1], 4);
    line(points[i][0], points[i][1], points[index][0], points[index][1]);
    noFill();
    stroke(153);
  }

  // reset if reaches a limit
  if (counter == change_limit) {
    counter = 0;
    if (step >= range[1]) {
      reverse = true;
    } else if (step <= range[0]) {
      reverse = false;
    }
    if (reverse) {
      step -= increment;
    } else {
      step += increment;
    }
  }
}

function render(x) {
  loadPixels();
  for (var i in x) {
    set(map(x[i][0], -6, 6, 0, width), map(x[i][1], 0, 12, height, 0), color([10, 255, 0]));
  }
  updatePixels();
}

function place() {
  var out = [];
  var r = random(0, 1);
  if (r <= 0.01) {
    out.push(0);
    out.push(0.16 * prev[1]);
  } else if (r <= 0.86) {
    out.push(0.85 * prev[0] + 0.04 * prev[1]);
    out.push(-0.04 * prev[0] + 0.85 * prev[1] + 1.6);
  } else if (r <= 0.93) {
    out.push(0.20 * prev[0] + -0.26 * prev[1]);
    out.push(0.23 * prev[0] + 0.22 * prev[1] + 1.6);
  } else {
    out.push(-0.15 * prev[0] + 0.28 * prev[1]);
    out.push(0.26 * prev[0] + 0.24 * prev[1] + 0.44);
  }
  prev = out;
  return out;
}