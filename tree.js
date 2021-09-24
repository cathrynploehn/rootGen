function Tree(p) {
  var thisObj = this;
  this.leaves = [];
  this.branches = d3.quadtree()
    .x(function(d){return d.pos.x;})
    .y(function(d){return d.pos.y;});

  this.branchArr = [];
  this.generations = [];
  this.age = 0;
  this.message = "hi";
  this.reachedContent = [];
  this.sColor = d3.scalePow([0, 11], [10, 255]).exponent(2);
  this.root;

  var loc = [[p.width/2, p.height/2]];
  for(var t = 0; t < loc.length;t++){
    thisObj.root = new Branch(p, null, p.createVector(loc[t][0], loc[t][1]), p.createVector(0, -1), t);
    this.branches.add(this.root);
    this.branchArr.push(this.root);
  }

  for(var i = 0; i < nutrientScape.contentPoints.length; i++){
    this.leaves.push(new Leaf(p, p.createVector(nutrientScape.contentPoints[i][0], nutrientScape.contentPoints[i][1]), true, i));
  }

  this.genLeaves = function(n, x, y){
    var closest = this.branches.find(x, y, max_dist);

    if(closest){
      this.message = "yum";

      var nutrient = Math.pow(nutrientScape.getNutrientAt(x, y)-2, 2);
      // var num = n ? n: numLeaves;
      var neg1 = Math.random() >= .5? -1: 1;
      var neg2 = Math.random() >= .5? -1: 1;
      for(var i = 0; i < nutrient; i++){
        this.leaves.push(new Leaf(p, p.createVector(x + (Math.random() * 50) * neg1, y + (Math.random() * 50) * neg2)));
      }

    } else {
      this.message = "i can't see that far away"
    }
  }

  // this.genLeaves();

  this.grow = function() {

    var reached = [];
    var closestBranches = {};
    //
    // console.log(this.leaves.length)
    for(var i = 0; i < this.leaves.length; i++){
      var leaf = this.leaves[i];
      var closest = this.branches.find(leaf.pos.x, leaf.pos.y, max_dist);
      var d = 1000;

      if(closest){
        var newDir = p5.Vector.sub(leaf.pos, closest.pos);
        newDir.normalize()
        closest.dir.add(newDir)
        closest.count++;
        closestBranches[closest.id] = closest;

        var d = p5.Vector.dist(closest.pos, leaf.pos);
      }
      if(((!leaf.content && (d >= max_dist+20 || leaf.age < 1)) || d <= min_dist)){
        if(leaf.content){
          if(!leaf.reached && tutorial) { tutorial.placeContent(leaf.contentIndex); }
          leaf.reached = true;
        } else {
          reached.push(i);
        }
        if(d <= min_dist){
          if(!isNaN(leaf.nutrient)){
            closest.color = this.sColor(leaf.nutrient+2);
          }
        }
      }
      leaf.age--;
    }

    for(var j = reached.length-1; j > 0; j--){
      this.leaves.splice(reached[j], 1);
    }

    for(br in closestBranches){
      var branch = closestBranches[br];
      branch.dir.div(branch.count);
        var len = this.branchArr.length;
        var child = branch.next(len);
        // console.log(abs(branch.dir.x) + abs(branch.dir.y));
        // console.log(child.pos);

        if(child){
          this.branches.add(child);
          this.branchArr.push(child)
        }


    }

    var toRemove = [];

    if(this.age > 300){
      // this.leaves = [];
      for(var k = 0; k < this.branchArr.length; k++){

        var branch = this.branchArr[k];

        if (branch.parent && Object.keys(branch.children).length === 0){
          if(branch.lifeforce < 1){
            delete branch.parent.children[branch.id];
            this.branches.remove(branch);
            toRemove.push(k);
          } else {
            branch.lifeforce--;
          }
        }
      }

      for(var j = toRemove.length -1; j > 0; j--){
        this.branchArr.splice(toRemove[j], 1);
      }
    }

    this.age++;
  }

  this.show = function(){
    // for(var i = 0; i < this.reachedContent.length; i++){
    //   this.reachedContent[i].show();
    // }
    for(var i = 0; i < this.branchArr.length; i++){
      this.branchArr[i].show();
    }
    for(var i = 0; i < this.leaves.length; i++){
      this.leaves[i].show();
    }

    p.push();
      p.noStroke();
      p.textSize(12);
      p.fill(0);
      if(palm && haveVideo){
        p.text(this.message, palm.x + 10, palm.y);
      } else if (!haveVideo) {
        p.text(this.message, p.mouseX + 10, p.mouseY);
      }
    p.pop();
  }

}
