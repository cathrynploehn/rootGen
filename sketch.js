var tree;

var max_dist = 30;
var numLeaves = 1000;

// weirdly can't get closer than this
var min_dist = 10;

function setup() {
  var elem = document.querySelector("body");
  createCanvas(500, 500);
  tree = new Tree();
}

function draw() {
  background(255);
  tree.show();
  tree.grow();
}
