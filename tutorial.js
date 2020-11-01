function Tutorial (p){

  this.displayWebcam = true;
  this.displayInteraction = true;
  this.contentVisible = false;
  this.age = 0;
  thisObj = this;

  var button1, button2, contentBtn;

  function removeWebcam (videoTracking){
    haveVideo = videoTracking;
    thisObj.displayWebcam = false;
    button1.remove();
    button2.remove();
  }

  this.setUpWebcam = function(){
    thisObj.displayWebcam = true;
    button1 = p.createButton('Yes, use hand tracking');
    button1.mousePressed(function(){ removeWebcam(true); });

    button2 = p.createButton('Use mouse instead');
    button2.mousePressed(function(){ removeWebcam(false); });
    thisObj.placeButtons();
  }

  this.placeButtons = function(){
    var leftMargin = 0;
    if(thisObj.contentVisible){ leftMargin = $("#content").outerWidth(); }
    button1.position(leftMargin + p.width/2 - (button1.width + button2.width+ 10)/2, p.height/2 + 50);
    button2.position(leftMargin + p.width/2 - (button1.width + button2.width+ 10)/2 + button1.width + 10, p.height/2 + 50);
  }

  this.placeContent = function(index){
    $('#content').append(wikipedia.paragraphs[index].data);
    if(!contentBtn){
      contentBtn = p.createButton('show/hide content');
      contentBtn.mousePressed(function(){ $("#content").toggle(); });
      contentBtn.position(titleWidth + 40 + controlBtn.width + interactionBtn.width, 25);
      $("#content").show();
    }
  }

  this.show = function(){
    if(this.displayWebcam){
      p.push();
        p.noStroke();
        p.fill(0)
        p.rect(0, 0, p.width, p.height);
        p.textAlign(p.CENTER, p.CENTER);
        p.fill(255)
        p.text("Use your hand to navigate. No data is stored.", p.width/2, p.height/2 + 30)
          p.translate(p.width, 0)
          p.scale(-1, 1);
          p.image(capture, p.width/2 - capture.width/2, p.height/2 - capture.height);
          p.filter(p.GRAY);
          // p.image(capture, 0, 0);
      p.pop();
    } else if(!this.displayWebcam && this.displayInteraction){
      p.push();
        p.textAlign(p.CENTER, p.CENTER);
        p.fill(255)
        if(haveVideo){
          p.text("Use your hand to navigate for content.", p.width/2, p.height/2 - 90)
          p.text("Place hand here", tree.root.pos.x, tree.root.pos.y + max_dist + 10)
        } else {
          p.text("Click and drag to navigate for content.", p.width/2, p.height/2 - 90)
          p.text("Click and drag me", tree.root.pos.x, tree.root.pos.y + max_dist + 10)
        }
        p.text("This website is the soil, and you are a root.", p.width/2, p.height/2 - 110)
        p.noStroke();
        p.fill(0, ((thisObj.age+1) / 1000) * 255)
        p.rect(0, 0, p.width, p.height);
        p.noFill();
        p.stroke(255);
        p.ellipse(tree.root.pos.x, tree.root.pos.y, max_dist+5, max_dist+5);
      p.pop();
      if(thisObj.age > 1000){
        thisObj.age = 0;
        thisObj.displayInteraction = false;
      }
      thisObj.age++;
    }
  }

  var titleWidth = $('#page-title').width() + 20;

  var controlBtn = p.createButton('controls');
  controlBtn.mousePressed(function(){ this.displayWebcam = true; this.displayInteraction = false; thisObj.setUpWebcam(); });
  controlBtn.position(titleWidth + 20, 25);

  var interactionBtn = p.createButton('what do I do?');
  interactionBtn.mousePressed(function(){ this.displayWebcam = false; thisObj.displayInteraction = true; thisObj.age = 0; });
  interactionBtn.position(titleWidth + 30 + controlBtn.width, 25);

  $("#content").hide();

  $("#close").on("click", function() {
    $("#content").hide();
    thisObj.contentVisible = false;
    thisObj.placeButtons();
  });

  this.setUpWebcam();
}
