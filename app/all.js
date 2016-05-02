var Parallax = function() {
  this.elements = document.querySelectorAll('[data-parallax]');

  this.animate(0);
};

Parallax.constructor = Parallax;

Parallax.prototype.animate = function(windowPos) {

  Array.prototype.forEach.call(this.elements, function(element) {

    var parts = element.dataset.parallax.split(',');
    var verticalRate = parseFloat(parts[0]) || 0;
    var verticalOffset = parseInt(parts[1]) || 0;
    // var horizontalRate = parseFloat(parts[2]) || 0;
    // var horizontalOffset = parseInt(parts[3]) || 0;

    console.log("parent1", element)
    var parent = element;



    var top = 0, left = 0;
    do {
        top += parent.offsetTop  || 0;
        // left += parent.offsetLeft || 0;
        parent = parent.offsetParent;
    } while(parent);

    // return {
    //     top: top,
    //     left: left
    // };

debugger



    var newVerticalPos = ((windowPos + verticalOffset - top) * verticalRate);
    element.style.top = newVerticalPos + 'px';

    // var newHorizontalPos = ((windowPos + horizontalOffset - element.parentNode.offsetleft) * horizontalRate);
    // element.style.left = newHorizontalPos + 'px';
  }.bind(this));

  console.log("  ")
};

var ScrollListener = function(callbacks) {
  this.callbacks = callbacks;

  window.onscroll = function() {
    var windowPos = (window.pageYOffset !== undefined) ?
      window.pageYOffset : (document.documentElement ||
      document.body.parentNode ||
      document.body).scrollTop;

    this.runCallbacks(windowPos)
  }.bind(this);
};

/**
 * @export
 */
ScrollListener.constructor = ScrollListener;

ScrollListener.prototype.runCallbacks = function(windowPos) {
  Array.prototype.forEach.call(this.callbacks, function(cb) {
    cb.callback.call(cb.context, windowPos);
  }.bind(this));
};
document.addEventListener("DOMContentLoaded", function(event) {

  var parallax = new Parallax();

  window.onscroll = function() {
    var windowPos = (window.pageYOffset !== undefined) ?
      window.pageYOffset : (document.documentElement ||
      document.body.parentNode ||
      document.body).scrollTop;

    parallax.animate(windowPos);
  }.bind(this);
  
});
