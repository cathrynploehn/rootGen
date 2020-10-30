var tree;

var max_dist = 30;
var numLeaves = 1000;

// weirdly can't get closer than 20 sometimes...
var min_dist = 15;

var group, scene, renderer, capture, predictions, mdl, predictHands, handmdl;
var verts = [];
var vertsHand = [];
var predicting = false;
var predictingHands = false;
var ready = false;
var palm = null;

var scaleDimensions = []
var nutrientScape;

function setup() {
  var elem = document.querySelector("body");
  createCanvas(elem.offsetWidth, elem.offsetHeight);

  capture = createCapture({ "video": { "width": { "min": 640/4, "max": 640/3 }, "height": { "min": 480/4, "max": 480/3 } } });

  const vid = document.querySelector('video');
        vid.addEventListener('loadeddata', (event) => {
          scaleDimensions = [width/capture.width, height/capture.height];
          loadmdls();
          capture.hide();
        });

  nutrientScape = new NutrientScape(width, height);
  var n = nutrientScape.getNutrientAt(401, 401);

  tree = new Tree();
}

function draw() {
  // nutrientScape.show();
  // background(0, 200);
  background(0)
  tree.show();
  tree.grow();

  // shows the video if you dare
  // push();
  //   scale(createVector(scaleDimensions[0], scaleDimensions[1]))
  //   translate(createVector(capture.width,0)); // move to far corner
  //   scale(-1,1.0);
  //
  //   // image(capture, 0, 0)
  //   background(255, 200);
  // pop();

  // if we have hand data, it throws up a circle somewhere in the palm area
  if(palm){
    stroke(255);
    ellipse(palm[0], palm[1], 5, 5)
  }

  if (!predictingHands && ready) {predictHand();}
}

function mousePressed(e) {
  tree.genLeaves(1, mouseX, mouseY);
  return false;
}
function mouseDragged(e) {
  tree.genLeaves(3, mouseX, mouseY);
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  nutrientScape.genGrid(windowWidth, windowHeight)
}

async function loadmdls() {
  // Load the MediaPipe handpose mdl assets.
  handmdl = await handpose.load();
  ready = true;
  predictHand();
}

async function predictHand() {
  predictingHands = true;

  predictHands = await handmdl.estimateHands(document.querySelector("video"));
  if(predictHands.length > 0){
    vertsHand = [];
    for (let i = 0; i < predictHands.length; i++) {
      const keypoints = predictHands[i].landmarks;
      for (let i = 0; i < keypoints.length; i++) {
        vertsHand.push([keypoints[i][0], keypoints[i][1], keypoints[i][2]]);
      }
    }
    // palm keypoints are [0, 1, 5, 9, 13];
    var x = width - (scaleDimensions[0] * vertsHand[1][0]);
    var y = ((vertsHand[9][1] - vertsHand[1][1])/2) + vertsHand[1][1];
        y = scaleDimensions[1] * y
    palm = [x, y];
    tree.genLeaves(1, x, y);
    predictingHands = false;
  } else {
    predictingHands = false;
  }
}
