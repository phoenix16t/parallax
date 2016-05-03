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

  // Array.prototype.forEach.call(this.elements, function(element) {

  this.elements.forEach(function(element) {

//     var parts = element.dataset.parallax.split(',');
//     var verticalRate = parseFloat(parts[0]) || 0;
//     var verticalOffset = parseInt(parts[1]) || 0;
//     // var horizontalRate = parseFloat(parts[2]) || 0;
//     // var horizontalOffset = parseInt(parts[3]) || 0;
// // debugger
//     console.log("parent1", element)
//     var parent = element.offsetParent;

//     var top = 0;
//     while(parent) {
//       top += parent.offsetTop  || 0;
//       parent = parent.offsetParent;
//     }



//     console.log("top", top)

    element.changePosition(windowPos);

    // var newHorizontalPos = ((windowPos + horizontalOffset - element.parentNode.offsetleft) * horizontalRate);
    // element.style.left = newHorizontalPos + 'px';
  }.bind(this));

  // console.log("  ")
};
