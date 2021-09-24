function Branch(p, parent, pos, direction, id) {
  this.pos = pos;
  this.parent = parent;
  this.dir = direction;
  this.origDir = this.dir.copy();
  this.count = 0;
  this.len = 1;
  this.id = id;
  this.children = {};
  this.lifeforce = 1;
  this.radius = .25;
  this.lastDist = 0;
  this.color = 50;

  // this.colorScale = chroma.scale(['FFDDE6', 'FF8CC1', 'AA0047']);
  this.colorScale = chroma.scale(['FF8CC1', 'AA0047']);

  this.reset = function(){
    this.dir = this.origDir.copy();
    this.count = 0;
  }

  this.next = function(id){
    var nextDir = p5.Vector.mult(this.dir, this.len)
    var nextPos = p5.Vector.add(this.pos, this.dir);
    var next = new Branch(p, this, nextPos, this.dir.copy(), id);
    this.children[id] = next;
    this.lifeforce += 5;
    // console.log(p5.Vector.dist(nextPos, this.pos))
    if(p5.Vector.dist(nextPos, this.pos) >= 0.01){
      return next;
    } else {
      return false;
    }
  }

  this.show = function() {
    if(this.parent != null){
      this.reset();
      var c = this.color;
      if(!(Object.keys(this.children).length === 0) && Object.keys(this.children).length > 0){
        var r = 0;
        for(ch in this.children){
          r +=  Math.pow(this.children[ch].radius, 1);
          if(this.children[ch].color > c){
            c = this.children[ch].color;
          }
        }
        this.radius = p.constrain(r, 0, 4);

        this.color = c;

      }
      p.strokeWeight(Math.min(this.radius, numLeaves/100));
      var strokeColor = this.colorScale(p.map(this.color, 50, 255, 0, 1));
      // console.log(strokeColor._rgb[0], strokeColor._rgb[1], strokeColor._rgb[2], strokeColor._rgb[3])
      p.stroke(strokeColor._rgb[0], strokeColor._rgb[1], strokeColor._rgb[2]);
      p.line(this.pos.x,this.pos.y, this.parent.pos.x, this.parent.pos.y)
    } else {
      p.fill(255)
      p.ellipse(this.pos.x,this.pos.y, 5, 5)
    }
  }

  this.getPos = function(){
    return this.pos;
  }
}
