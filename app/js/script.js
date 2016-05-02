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
