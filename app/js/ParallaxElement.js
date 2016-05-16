var ParallaxElement = function(element) {

  var top = 0;
  var left = 0;

  var parent = element.offsetParent;
  var parts = element.dataset.parallax.split(',');
  this.parentHeight = parent.offsetHeight;
// debugger
  while(parent) {
    top += parent.offsetTop || 0;
    left += parent.offsetLeft || 0;
    parent = parent.offsetParent;
  }

  this.element = element;

  this.movePosMarker = document.querySelector('.movePos');

  this.topOffset = element.offsetTop;
  this.leftOffset = element.offsetLeft;
  this.boundaryTop = top;
  this.boundaryBottom = top + this.parentHeight;
  this.boundaryLeft = left;

  this.xRate = parseFloat(parts[0]) || 0;
  this.yRate = parseFloat(parts[1]) || 0;
  this.zRate = parseFloat(parts[2]) || 0;
  this.xRotateRate = parseFloat(parts[3]) || 0;
  this.yRotateRate = parseFloat(parts[4]) || 0;
  this.zRotateRate = parseFloat(parts[5]) || 0;

  this.constrain = parts[6] || null;
  this.hidden = false;

  this.init();
};

ParallaxElement.constructor = ParallaxElement;

ParallaxElement.prototype.init = function() {
  this.element.classList.add('fixed');

  // set initial position
  this.setX(0);
  this.setY(0);
  this.resetZ();

  // set initial orientation
  this.rotateX(0);
  this.rotateY(0);
  this.rotateZ(0);

  // set list of animatable parallaxes
  this.parallaxList = [];

  if(this.xRate !== 0) { this.parallaxList.push(this.setX.bind(this)); }
  if(this.yRate !== 0) { this.parallaxList.push(this.setY.bind(this)); }
  if(this.zRate !== 0) { this.parallaxList.push(this.setZ.bind(this)); }
  if(this.xRotateRate !== 0) { this.parallaxList.push(this.rotateX.bind(this)); }
  if(this.yRotateRate !== 0) { this.parallaxList.push(this.rotateY.bind(this)); }
  if(this.zRotateRate !== 0) { this.parallaxList.push(this.rotateZ.bind(this)); }
};

//////////////////////////////////////////////////
///// main functions
//////////////////////////////////////////////////
ParallaxElement.prototype.changePosition = function(windowPos) {
  // var movePos = windowPos - this.boundaryTop;




  var movePos = windowPos - this.boundaryTop + (window.innerHeight / 2);// - (this.parentHeight / 2);
  // console.log("windowPos", movePos, windowPos, this.boundaryTop, window.innerHeight / 2, this.parentHeight / 2);
  // windowPos += (window.innerHeight / 2);
// console.log("height", window.innerHeight, movePos)

  console.log("tihs.boundaryTop", windowPos, this.boundaryTop)


  // this.movePosMarker.style.top = windowPos + 'px';

  // constrain element
  this.toggleConstraints(windowPos);

  this.resetTransform();

  // animate parallaxes
  if(!this.hidden) {
    this.parallaxList.forEach(function(parallaxDirection) {
      parallaxDirection(movePos);
    }.bind(this));
  }
};

ParallaxElement.prototype.resetTransform = function() {
  this.element.style.transform = '';
};

//////////////////////////////////////////////////
///// position functions
//////////////////////////////////////////////////
ParallaxElement.prototype.setX = function(movePos) {
  var xPosOnScreen = this.leftOffset + this.boundaryLeft + (movePos * this.xRate);
  // var xPosOnScreen = this.leftOffset + (movePos * this.xRate);
  console.log("this.leftOffset", this.leftOffset, this.boundaryLeft, movePos)
  this.element.style.left = xPosOnScreen + 'px';
};

ParallaxElement.prototype.setY = function(movePos) {
  var yPosOnScreen = this.topOffset + (movePos * this.yRate);// + (window.innerHeight / 2) - (this.parentHeight / 2);
  this.element.style.top = yPosOnScreen + 'px';
};

ParallaxElement.prototype.setZ = function(movePos) {
  var zPosOnScreen;

  if(this.zRate > 0) {
    zPosOnScreen = movePos * this.zRate;
    this.element.style.transform = 'scaleX(' + zPosOnScreen + ') scaleY(' + zPosOnScreen + ')';
  }
  else if(this.zRate < 0) {
    zPosOnScreen = (this.parentHeight - movePos) * this.zRate;
    this.element.style.transform = 'scaleX(' + zPosOnScreen + ') scaleY(' + zPosOnScreen + ') rotateZ(180deg)';
  }
};

ParallaxElement.prototype.resetZ = function() {
  this.element.style.transform = 'scaleX(1) scaleY(1)';
};

//////////////////////////////////////////////////
///// rotations functions
//////////////////////////////////////////////////
ParallaxElement.prototype.rotateX = function(movePos) {
  var xRotation = movePos * this.xRotateRate;
  this.element.style.transform += ' rotateX(' + xRotation + 'deg)';
};

ParallaxElement.prototype.rotateY = function(movePos) {
  var yRotation = movePos * this.yRotateRate;
  this.element.style.transform += ' rotateY(' + yRotation + 'deg)';
};

ParallaxElement.prototype.rotateZ = function(movePos) {
  var zRotation = movePos * this.zRotateRate;
  this.element.style.transform += ' rotateZ(' + zRotation + 'deg)';
};

//////////////////////////////////////////////////
///// constraint function
//////////////////////////////////////////////////
ParallaxElement.prototype.toggleConstraints = function(windowPos) {
  if(this.constrain === 'constrain') {
    if(windowPos >= this.boundaryTop && windowPos <= this.boundaryBottom) {
      this.element.classList.remove('hidden');
      this.hidden = false;
    }
    else {
      this.element.classList.add('hidden');
      this.hidden = true;
    }
  }
};
