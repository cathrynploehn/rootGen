function Leaf(p, pos, isContent, contentIndex) {
  this.pos = pos || p.createVector(p.random(p.width), p.random(p.height));
  this.reached = false;
  this.age = 100;
  this.content = isContent;
  this.contentIndex = contentIndex;
  this.nutrient = 5;

  this.show = function() {
    if(this.reached && this.content){
      p.noStroke();
      p.fill(170, 0, 71);
      // p.strokeWeight(1.5);
      p.ellipse(this.pos.x, this.pos.y, min_dist/2, min_dist/2)
    }
    if(this.content){
      p.noStroke();
      p.fill(170, 0, 71);
      // p.strokeWeight(1.5);
      p.ellipse(this.pos.x, this.pos.y, 2, 2)
    }
  }
}
