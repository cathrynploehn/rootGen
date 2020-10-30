function Leaf(pos) {
  this.pos = pos || createVector(random(width), random(height));
  this.reached = false;
  this.age = 100;

  this.show = function() {
    noFill();
    strokeWeight(.5)
    stroke(255);
    ellipse(this.pos.x, this.pos.y, min_dist, min_dist)
  }
}
