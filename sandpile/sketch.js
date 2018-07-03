// ==========================================================================
// | Abelian sandpile model
// | https://en.wikipedia.org/wiki/Abelian_sandpile_model

var grid = [];
var speed = 2;

function setup() {
  // canvas setup
  createCanvas(200, 200);
  pixelDensity(1);
  colorMode(RGB);

  // create an empty grid
  // with a sand at the center
  for (var i = 0; i < height; i++) {
    var holder = [];
    for (var j = 0; j < width; j++) {
      holder.push(2);
    }
    grid.push(holder);
  }

  grid[floor(height / 2)][floor(width / 2)] = 999999;
}

function draw() {
  render();
  for (var i = 0; i < speed; i++) {
    shift();
  }
}

function render() {
  loadPixels();
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      var num = grid[i][j];
      var index = i * width + j;
      set(i, j, color(render_color(num)));
    }
  }
  updatePixels();
}

function shift() {
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      if (grid[i][j] >= 4) {
        grid[i][j] -= 4;
        grid[i - 1][j]++;
        grid[i + 1][j]++;
        grid[i][j - 1]++;
        grid[i][j + 1]++;
      }
    }
  }
}

function render_color(x) {
  var out;
  switch (x) {
    case 0:
      out = [0, 0, 0];
      break;
    case 1:
      out = [255, 0, 0];
      break;
    case 2:
      out = [255, 255, 0];
      break;
    case 3:
      out = [255, 255, 255];
      break;
    default:
      out = [0, 255, 255];
  }
  return out;
}