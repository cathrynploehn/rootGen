function NutrientScape(p, width, height, resolution) {
  p.noiseSeed(100);
  this.grid = [];
  this.peaks = [];
  this.contentPoints = [];
  var thisObj = this;

  this.genGrid = function(width, height, resolution) {
    if(!this.resolution) {thisObj.resolution = resolution ? resolution: 10;}
    thisObj.width = Math.floor(width / thisObj.resolution);
    thisObj.height = Math.floor(height / thisObj.resolution);

    var max;
    for (var y = 0; y < thisObj.height; y++) {
      for(var x = 0; x < thisObj.width; x++) {
        var row = [];
  			var c = 10 * p.noise(0.05 * x, 0.05 * y);
        var obj = {x: x, y: y, val: c, index: thisObj.grid.length, peak: false};
        thisObj.grid.push(obj);
        var d = p5.Vector.dist(p.createVector(obj.x* thisObj.resolution, obj.y* thisObj.resolution), p.createVector(p.width/2, p.height/2));
        if(c > 5 && (d > (max_dist + 50))){
          if(d < max_dist + 50){console.log(d);}
          thisObj.peaks.push(obj); }
  		}
    }
    for(var i = 0; i < wikipedia.paragraphs.length; i++){
      var rand = Math.floor(Math.random() * thisObj.peaks.length);
      var obj = thisObj.peaks[rand];
      // var obj = thisObj.peaks[i];
      obj.peak = true;
      thisObj.contentPoints.push([obj.x * thisObj.resolution, obj.y * thisObj.resolution]);
    }
  }

  this.getNutrientAt = function(x, y){
    var indX = Math.floor(x / this.resolution);
    var indY = Math.floor(y / this.resolution);
    var ob = this.grid[(this.width * indY) + indX];
    if(ob){
      return ob.val;
    }
  }

  this.show = function(){
    for(var j = 0; j < thisObj.grid.length; j++){
      var obj = thisObj.grid[j];
      var x = obj.x;
      var y = obj.y;

      p.noStroke();
      p.fill(obj.val*20);
      p.rect(x* thisObj.resolution, y* thisObj.resolution, thisObj.resolution, thisObj.resolution);

      if(obj.peak){
        p.fill(255, 0, 0);
        p.ellipse(x* thisObj.resolution + thisObj.resolution/2, y* thisObj.resolution+ thisObj.resolution/2, thisObj.resolution/2, thisObj.resolution/2);
      }

    }
  }

  this.genGrid(width, height, resolution);
}
