var sketch;

var max_dist = 40;
var numLeaves = 1000;

// weirdly can't get closer than 20 sometimes...
var min_dist = 21;

var verts = [];

var ready = false;

var tree;

var scaleDimensions = [1, 1];

window.onload = function(){
  sketch = new p5(rootSketch, "canvas-container");
}

var rootSketch =  async function (p){
  p.setup = async function() {
    p.frameRate(24);
    var elem = document.getElementById("canvas-container");
    var dimension = elem.offsetWidth  > elem.offsetHeight ? elem.offsetHeight : elem.offsetWidth;
    p.createCanvas(dimension, dimension);

    p.textFont("courier");

    vid = document.querySelector('video');

    scaleDimensions = [1, 1];
    init();

    function init(){
      tree = new Tree(p);
      // tutorial = new Tutorial(p);
    }
  }

  p.draw = function() {
    p.background(255);

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
