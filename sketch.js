var sketch;

var max_dist = 100;
var numLeaves = 1000;

// weirdly can't get closer than 20 sometimes...
var min_dist = 15;


var verts = [];

var ready = false;

var tree;

var scaleDimensions = [1, 1];

window.onload = function(){
  sketch = new p5(rootSketch);
}

var rootSketch =  async function (p){
  p.setup = async function() {
    p.frameRate(24);
    var elem = document.querySelector("body");
    p.createCanvas(elem.offsetWidth, elem.offsetHeight);
    p.textFont("courier");

    tree = new Tree(p);
  }

  p.draw = function() {
    p.background(0);

    if(tree){
      tree.show();
      tree.grow();
    }

  }

  p.mousePressed = function(e) {
    if(tree){tree.genLeaves(1, p.mouseX, p.mouseY);}
    return false;
  }
  p.mouseDragged = function(e) {
    if(tree){tree.genLeaves(3, p.mouseX, p.mouseY)};
    return false;
  }
  p.mouseReleased = function(e) {
    if(tree){tree.message = "";}
  }
  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

}
