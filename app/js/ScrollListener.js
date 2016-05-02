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