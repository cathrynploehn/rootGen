function Leaf(pos) {
  this.pos = pos || createVector(random(width), random(height));
  this.reached = false;
  this.age = 500;

  this.show = function() {
    noFill();
    strokeWeight(.5)
    stroke(0);
    ellipse(this.pos.x, this.pos.y, min_dist, min_dist)
  }
}
