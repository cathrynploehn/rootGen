function Tree() {
  this.leaves = [];
  this.branches = d3.quadtree()
    .x(function(d){return d.pos.x;})
    .y(function(d){return d.pos.y;});

  this.branchArr = [];
  this.generations = [];
  this.age = 0;
  this.message = "hi";


  var loc = [[width/2, height/2]];
  for(var t = 0; t < loc.length;t++){
    var root = new Branch(null, createVector(loc[t][0], loc[t][1]), createVector(0, -1), t);
    this.branches.add(root);
    this.branchArr.push(root);
  }

  this.genLeaves = function(n, x, y){
    var closest = this.branches.find(x, y, max_dist);

    if(closest){

      var nutrient = Math.pow(nutrientScape.getNutrientAt(x, y)-2, 2);
      this.message = Math.floor(nutrient);
      // var num = n ? n: numLeaves;
      var neg1 = Math.random() >= .5? -1: 1;
      var neg2 = Math.random() >= .5? -1: 1;
      for(var i = 0; i < nutrient; i++){
        this.leaves.push(new Leaf(createVector(x + (Math.random() * 50) * neg1, y + (Math.random() * 50) * neg2)));
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
        // console.log(closest)
        var newDir = p5.Vector.sub(leaf.pos, closest.pos);
        newDir.normalize()
        closest.dir.add(newDir)
        closest.count++;
        closestBranches[closest.id] = closest;

        var d = p5.Vector.dist(closest.pos, leaf.pos);
        // console.log(d)
      }
      if(d >= max_dist+20 || d <= min_dist || leaf.age < 1){
        reached.push(i);
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
        this.branches.add(child);
        this.branchArr.push(child)


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
    // for(var i = 0; i < this.leaves.length; i++){
    //   this.leaves[i].show();
    // }
    for(var i = 0; i < this.branchArr.length; i++){
      this.branchArr[i].show();
    }

    push();
      noStroke();
      textSize(12);
      fill(255, 255);
      if(palm){
        text(this.message, palm[0], palm[1]);
      } else {
        text(this.message, mouseX, mouseY);
      }
    pop();
  }
}
