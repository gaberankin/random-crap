(function($) {
  var _shake;
  $.fn.wiggle = function(options) {
    var defaults;
    defaults = {
      time: 3000,
      axis: 'x',
      frequency: 100,
      distance: 5,
      onComplete: $.noop
    };
    options = $.extend(defaults, options);
    if (options.time === 'slow') {
      options.time = 3000;
    } else if (options.time === 'fast') {
      options.time = 1000;
    }
    options.axis = (options.axis + '').toLowerCase();
    if (options.axis !== 'x' && options.axis !== 'y') {
      if (console !== void 0) {
        console.error("" + options.axis + " is an invalid axis.  Please specify x (horizontal) or y (vertical)");
      }
      return this;
    }
    return this.each(function() {
      if (options.frequency === 0) {
        if (console !== void 0) {
          console.warn("the frequency for this wiggle was set to 0, so we're not actually going to do anything.", this);
        }
        options.onComplete.apply(this);
        return;
      }
      if (options.axis === 'x') {
        _shake(this, options, 'left');
      } else {
        _shake(this, options, 'top');
      }
    });
  };
  _shake = function(el, options, attr) {
    var $el, dPerTick, f, now, tickLen, x;
    tickLen = options.time / options.frequency;
    dPerTick = parseInt(options.distance) / options.frequency;
    now = new Date;
    x = 0;
    $el = $(el);
    f = function() {
      var animationArgs;
      animationArgs = {};
      animationArgs[attr] = x === 0 ? (x % 2 === 0 ? "+=" : "-=") + ("" + options.distance + "px") : (x % 2 === 0 ? "+=" : "-=") + ("" + (options.distance * 2) + "px");
      $el.animate(animationArgs, {
        duration: tickLen,
        queue: false,
        complete: function() {
          x++;
          curTime += tickLen;
          console.log(curTime);
          if (x > options.freq || (new Date - now) >= options.time) {
            options.onComplete.apply(el);
          } else {
            f();
          }
        }
      });
    };
    f();
  };
})(jQuery);
