// ==========================================================================
// | Barnsley fern
// | https://en.wikipedia.org/wiki/Barnsley_fern

var speed = 1000;
var prev = [0, 0];

function setup() {
  // canvas setup
  createCanvas(600, 600);
  pixelDensity(1);
  colorMode(RGB);
  background(0, 0, 0);
}

function draw() {
  var change = [];
  for (var i = 0; i < speed; i++) {
    change.push(place());
  }
  render(change);
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