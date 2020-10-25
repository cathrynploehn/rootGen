var tree;

var max_dist = 30;
var numLeaves = 1000;

// weirdly can't get closer than this
var min_dist = 10;

function setup() {
  var elem = document.querySelector("body");
  createCanvas(elem.offsetWidth, elem.offsetHeight);
  tree = new Tree();
}

function draw() {
  background(255);
  tree.show();
  tree.grow();
}

function mousePressed(e) {
  tree.genLeaves(1, mouseX, mouseY);
  return false;
}
function mouseDragged(e) {
  tree.genLeaves(1, mouseX, mouseY);
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
