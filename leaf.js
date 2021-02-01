function Leaf(p, pos, isContent, contentIndex) {
  this.pos = pos || p.createVector(p.random(p.width), p.random(p.height));
  this.reached = false;
  this.age = 100;
  this.content = isContent;
  this.contentIndex = contentIndex;
  this.nutrient = 10;

  this.show = function() {
      p.fill(255);
      p.ellipse(this.pos.x, this.pos.y, min_dist/2, min_dist/2)
  }
}
