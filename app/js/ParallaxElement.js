var ParallaxElement = function(element) {

  var top = 0;
  var left = 0;

  var parent = element.offsetParent;
  var parts = element.dataset.parallax.split(',');
  var parentOffsetHeight = parent.offsetHeight;
  var parentOffsetWidth = parent.offsetWidth;

  while(parent) {
    top += parent.offsetTop || 0;
    left += parent.offsetLeft || 0;
    parent = parent.offsetParent;
  }

  this.element = element;
  this.xRate = parseFloat(parts[0]) || 0;
  this.yRate = parseFloat(parts[1]) || 0;
  this.zRate = parseFloat(parts[2]) || 0;

  this.constrain = parts[3] || null;
  this.hidden = false;

  this.topOffset = element.offsetTop;
  this.leftOffset = element.offsetLeft;

  this.boundaryTop = top;
  this.boundaryBottom = top + parentOffsetHeight;
  this.boundaryLeft = left;

  this.init();
};

ParallaxElement.constructor = ParallaxElement;

ParallaxElement.prototype.init = function() {
  this.element.classList.add('fixed');

  this.setX(0);
  this.setY(0);
  this.resetZ();
  this.toggleConstrain(0);
};

ParallaxElement.prototype.changePosition = function(windowPos) {

  var movePos = windowPos - this.boundaryTop;

  // constrain element
  this.toggleConstrain(windowPos);

  if(!this.hidden) {
    // move x
    if(this.xRate !== 0) {
      this.setX(movePos);
    }
    // move y
    if(this.yRate !== 0) {
      this.setY(movePos);
    }
    // move z
    if(this.zRate !== 0) {
      this.setZ(movePos);
    }
  }
};

ParallaxElement.prototype.setX = function(movePos) {
  var xPosOnScreen = this.leftOffset + this.boundaryLeft + (movePos * this.xRate);
  this.element.style.left = xPosOnScreen + 'px';
};

ParallaxElement.prototype.setY = function(movePos) {
  var yPosOnScreen = this.topOffset + (movePos * this.yRate);
  this.element.style.top = yPosOnScreen + 'px';
};

ParallaxElement.prototype.setZ = function(movePos) {
  var zPosOnScreen = movePos * this.zRate;

  if(zPosOnScreen > 0) {
    this.element.style.transform = 'scaleX(' + zPosOnScreen + ') scaleY(' + zPosOnScreen + ')';
  }
  else if(zPosOnScreen <= 0) {
    this.element.style.transform = 'scaleX(0) scaleY(0)';
  }
};

ParallaxElement.prototype.resetZ = function() {
  this.element.style.transform = 'scaleX(1) scaleY(1)';
};

ParallaxElement.prototype.toggleConstrain = function(windowPos) {
  if(this.constrain === 'con') {
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
