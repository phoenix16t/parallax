var ParallaxElement = function(element) {
  var top = 0;
  var parts = element.dataset.parallax.split(',');
  var parent = element.offsetParent;
  var parentOffsetHeight = parent.offsetHeight;

  while(parent) {
    top += parent.offsetTop || 0;
    parent = parent.offsetParent;
  }

  this.el = element;
  this.parentTop = top;
  this.parentBottom = top + parentOffsetHeight;
  this.verticalRate = parseFloat(parts[0]) || 0;
  this.verticalOffset = parseInt(parts[1]) || 0;

  if(this.verticalRate === 1) {
    this.adjustedOffset = this.verticalOffset;
  }
  else {
    this.adjustedOffset = this.verticalOffset - this.parentTop;
  }

  this.el.classList.add('fixed');
};

ParallaxElement.constructor = ParallaxElement;

ParallaxElement.prototype.changePosition = function(windowPos) {
  if(this.verticalRate === 1) {
    var posOnScreen = this.adjustedOffset;
  }
  else {
    var posOnScreen = ((windowPos + this.adjustedOffset) * (this.verticalRate - 1));
  }
  this.el.style.top = posOnScreen + 'px';

  var absolutePos = windowPos + posOnScreen;

  if(absolutePos > this.parentTop && absolutePos < this.parentBottom) {
    this.el.classList.remove('hidden');
  }
  else {
    this.el.classList.add('hidden');
  }
};
