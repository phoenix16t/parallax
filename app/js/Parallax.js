var Parallax = function() {
  var elements = document.querySelectorAll('[data-parallax]');
  this.elements = [];

  Array.prototype.forEach.call(elements, function(element) {
    this.elements.push(new ParallaxElement(element));
  }.bind(this));

  this.animate(0);
};

Parallax.constructor = Parallax;

Parallax.prototype.animate = function(windowPos) {
  this.elements.forEach(function(element) {
    element.changePosition(windowPos);
  }.bind(this));
};
