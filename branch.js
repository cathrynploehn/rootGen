function Branch(parent, pos, direction, id) {
  this.pos = pos;
  this.parent = parent;
  this.dir = direction;
  this.origDir = this.dir.copy();
  this.count = 0;
  this.len = 1;
  this.id = id;
  this.children = {};
  this.lifeforce = 1;
  this.radius = .5;
  this.lastDist = 0;

  this.reset = function(){
    this.dir = this.origDir.copy();
    this.count = 0;
  }

  this.next = function(id){
    var nextDir = p5.Vector.mult(this.dir, this.len)
    var nextPos = p5.Vector.add(this.pos, nextDir);
    var next = new Branch(this, nextPos, this.dir.copy(), id);
    this.children[id] = next;
    this.lifeforce += nutrientScape.getNutrientAt(nextPos.x, nextPos.y);
    return next;
  }

  this.show = function() {
    if(this.parent != null){
      this.reset();
      if(!(Object.keys(this.children).length === 0)){
        var r = 0;
        for(ch in this.children){
          r +=  Math.pow(this.children[ch].radius, 1);
        }
        this.radius = r;;
      }
      strokeWeight(Math.min(this.radius, numLeaves/100));
      stroke(255)
      line(this.pos.x,this.pos.y, this.parent.pos.x, this.parent.pos.y)
    }
  }

  this.getPos = function(){
    return this.pos;
  }
}
