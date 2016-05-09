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
  this.xRate = parseFloat(parts[0]) - 1 || 0;
  this.yRate = parseFloat(parts[1]) - 1 || 0;

  this.topOffset = element.offsetTop;
  this.leftOffset = element.offsetLeft;

  this.boundaryTop = top;
  this.boundaryBottom = top + parentOffsetHeight;
  this.boundaryLeft = left;
  this.boundaryRight = left + parentOffsetWidth;

  this.element.classList.add('fixed');

  this.changePosition(0);
};

ParallaxElement.constructor = ParallaxElement;

ParallaxElement.prototype.changePosition = function(windowPos) {
// console.log('kjh')
  var posOnScreen = this.topOffset + ((windowPos - this.boundaryTop) * this.yRate);
  // var horPosOnScreen = this.leftOffset + ((windowPos - this.boundaryTop) * this.xRate);

  var horPosOnScreen = this.leftOffset + this.boundaryLeft + ((windowPos - this.boundaryTop) * this.xRate);
  // console.log("horPosOnScreen", horPosOnScreen)

  this.element.style.top = posOnScreen + 'px';
// this.element.style.transform = 'translateY(' + posOnScreen + 'px)';
  this.element.style.left = horPosOnScreen + 'px';
  // this.element.style.transform = 'translateZ(' + windowPos + 'px)';
  // this.element.style.webkitTransform = 'translateZ(' + windowPos + 'px)';

  // if(windowPos >= this.boundaryTop && windowPos <= this.boundaryBottom) {
  //   this.element.classList.remove('hidden');
  // }
  // else {
  //   this.element.classList.add('hidden');
  // }
};
