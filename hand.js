function Hand(p){
  var oldPalm = null;
  var newPalm = null;
  var vertsHand = [];
  var keypointsToShow = [4, 8, 12, 16, 20];
    // var keypointsToShow = [4];
  var predicting = false;
  var predictingHands = false;
  let step = 0.05;
  let amount = 0;
  let age = 0;

  this.loadmdls = async function() {
    // Load the MediaPipe handpose mdl assets
    handmdl = await handpose.load();
    ready = true;
    if(haveVideo) {this.predictHand();}
  }

  this.predictHand = async function() {
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
      var x = p.width - (scaleDimensions[0] * vertsHand[0][0]);
      var y = ((vertsHand[13][1] - vertsHand[0][1])/2) + vertsHand[0][1];
          y = scaleDimensions[1] * y;
      var r = (vertsHand[13][1] - vertsHand[0][1]) * scaleDimensions[1];

      amount = 0;
      // if(!newPalm){
      //   oldPalm = p.createVector(x, y);
      // } else {
      //   oldPalm = newPalm;
      // }
      //
      newPalm = p.createVector(x, y)


      predictingHands = false;
    } else {
      // palm = null;
      predictingHands = false;
    }
  }

  this.show = function(){
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
    var x = p.mouseX;
    var y = p.mouseY;
    p.stroke(255);
    p.noFill();

    if(haveVideo && newPalm){
      if(amount < 1){
        amount += step;
      }

      if(!palm){
        palm = newPalm;
      } else {
        palm = p5.Vector.lerp(palm, newPalm, amount);
        if(tree && age % 3 == 0){tree.genLeaves(1, palm.x, palm.y);}
      }
      // console.log(palm);
      for(var i = 0; i < keypointsToShow.length; i++){
        let index = keypointsToShow[i];
        let x = (p.width - (vertsHand[index][0] * scaleDimensions[0])) - palm.x;
        let y = (vertsHand[index][1] * scaleDimensions[1]) - palm.y;
        let v = p.createVector(x, y);
            v = v.normalize();
        p.ellipse((v.x * max_dist) + palm.x, (v.y * max_dist) + palm.y, 2, 2);
        p.line((v.x * max_dist) + palm.x, (v.y * max_dist) + palm.y, palm.x, palm.y)
      }
    } else if (!haveVideo) {
      p.ellipse(x, y, max_dist, max_dist)
      p.fill(255);
      p.ellipse(x, y, 3, 3)
    }
    // ellipse(palm[0], palm[1], palm[2], palm[2]) scale circle to palm size


    age++;
    if (age % 5 == 0 && haveVideo && !predictingHands && ready) {age = 0; this.predictHand(); }
  }

  this.loadmdls();

}
