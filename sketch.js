var sketch;

var max_dist = 40;
var numLeaves = 1000;

// weirdly can't get closer than 20 sometimes...
var min_dist = 15;

var group, scene, renderer, capture, vid, predictions, mdl, predictHands, handmdl;

var haveVideo = false;
var haveWebcam = true;

var verts = [];

var ready = false;
var palm = null;

var tree, hand, tutorial, nutrientScape;

var scaleDimensions = [1, 1];

window.onload = function(){
  sketch = new p5(rootSketch);
}

var rootSketch =  function (p){
  p.setup = function() {
    p.frameRate(24);
    var elem = document.querySelector("body");
    p.createCanvas(elem.offsetWidth, elem.offsetHeight);

    p.textFont("courier");

    capture = p.createCapture({ "video": { "width": { "ideal": 640/3 }, "height": { "ideal": 480/3 } } });
    vid = document.querySelector('video');
    haveWebcam = true;
    // // capture = p.createCapture({ "video": { "width": { "min": 640/4, "max": 640/3 }, "height": { "min": 480/4, "max": 480/3 } } });

    capture.loadPixels();

      if(capture.pixels[1] > 0) {
        vid.addEventListener('loadeddata', async (event) => {
          capture.hide();
          scaleDimensions = [p.width/capture.width, p.height/capture.height];
          haveVideo = true;
          init();
        });
      } else {
        // error handling here
        haveWebcam = false;
        scaleDimensions = [1, 1];
        init();
      }
    // if(haveWebcam && vid){
    // } else {
    // }

    function init(){
      hand = new Hand(p);
      nutrientScape = new NutrientScape(p, p.width, p.height);
      var n = nutrientScape.getNutrientAt(401, 401);

      tree = new Tree(p);
      tutorial = new Tutorial(p);
    }
  }

  p.draw = function() {
    p.background(0);

    if(tutorial) { tutorial.show(); }
    if(hand) {hand.show()};
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
    if(tutorial.displayInteraction){ tutorial.displayInteraction = false;  }
    if(tree){tree.genLeaves(3, p.mouseX, p.mouseY)};
    return false;
  }
  p.mouseReleased = function(e) {
    if(tree){tree.message = "";}
  }
  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    nutrientScape.genGrid(p.windowWidth, p.windowHeight);
    tutorial.placeButtons();
  }

}
