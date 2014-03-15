(function($) {
  var dogeHeadLeft, dogeHeadLeftDown, dogeHeadLeftUp, dogeHeadRight, dogeHeadRightDown, dogeHeadRightUp, heads, shakeHorzMoveUp;
  dogeHeadRight = function(doge) {
    var head;
    head = this;
    doge.css({
      right: "0",
      left: "auto"
    });
    shakeHorzMoveUp(doge, {
      vdist: head.h,
      hdist: 5,
      time: 3000,
      callback: function() {
        doge.animate({
          bottom: "0"
        }, function() {
          var offset;
          offset = ($(this).position().left) + head.w;
          $(this).delay(300).animate({
            right: offset
          }, 2200, function() {
            doge.css({
              bottom: "-" + head.h + "px",
              left: "auto",
              right: "0",
              top: "auto"
            });
            doge.attr('data-locked', '0');
          });
        });
      }
    });
  };
  dogeHeadRightDown = dogeHeadRight;
  dogeHeadRightUp = dogeHeadRight;
  dogeHeadLeft = function(doge) {
    var head;
    head = this;
    doge.css({
      right: "auto",
      left: "0"
    });
    shakeHorzMoveUp(doge, {
      vdist: head.h,
      hdist: 5,
      time: 3000,
      attr: 'left',
      callback: function() {
        doge.animate({
          bottom: "0"
        }, function() {
          var offset;
          offset = $(window).width() + head.w;
          $(this).delay(300).animate({
            left: offset
          }, 2200, function() {
            doge.css({
              bottom: "-" + head.h + "px",
              left: "auto",
              right: "0",
              top: "auto"
            });
            doge.attr('data-locked', '0');
          });
        });
      }
    });
  };
  dogeHeadLeftDown = dogeHeadLeft;
  dogeHeadLeftUp = dogeHeadLeft;
  heads = [
    {
      fn: dogeHeadRight,
      src: 'doge-head-right',
      w: 250,
      h: 265
    }, {
      fn: dogeHeadRightDown,
      src: 'doge-head-right-down',
      w: 265,
      h: 250
    }, {
      fn: dogeHeadRightUp,
      src: 'doge-head-right-up',
      w: 265,
      h: 250
    }, {
      fn: dogeHeadLeft,
      src: 'doge-head-left',
      w: 250,
      h: 265
    }, {
      fn: dogeHeadLeftDown,
      src: 'doge-head-left-down',
      w: 265,
      h: 250
    }, {
      fn: dogeHeadLeftUp,
      src: 'doge-head-left-up',
      w: 265,
      h: 250
    }
  ];
  $.fn.doge = function(options) {
    var defaults, doge, dogeImageMarkup;
    defaults = {
      enterOn: "click",
      delayTime: 5000,
      imagePath: ''
    };
    dogeImageMarkup = '<img id="the-doge" style="display: none" src="#" />';
    doge = $(dogeImageMarkup).appendTo("body");
    options = $.extend(defaults, options);
    return this.each(function() {
      var init, _this;
      _this = $(this);
      init = function() {
        var e, hIndex, head;
        if (doge.attr('data-locked') === '1') {
          return;
        }
        hIndex = Math.floor(Math.random() * heads.length);
        head = heads[hIndex];
        console.log(head);
        doge.attr('data-locked', '1').attr("src", (options.imagePath ? "" + options.imagePath + "/" : '') + head.src + '.png').css({
          position: "fixed",
          bottom: "-" + head.h + "px",
          right: "0",
          display: "block"
        });
        try {
          head.fn.apply(head, [doge]);
        } catch (_error) {
          e = _error;
          doge.attr('data-locked', '0');
          console.error(e);
        }
      };
      if (options.enterOn === "timer") {
        setTimeout(init, options.delayTime);
      } else if (options.enterOn === "click") {
        _this.bind("click", function(e) {
          e.preventDefault();
          if (doge.attr('data-locked') !== '1') {
            init();
          }
        });
      }
    });
  };
  shakeHorzMoveUp = function(el, args) {
    var curTime, curVdist, f, tickLen, vPerTick, x;
    if (args == null) {
      args = {};
    }
    args = $.extend({
      'vdist': 100,
      'hdist': 10,
      'freq': 100,
      'time': 4000,
      'callback': $.noop,
      'attr': 'right'
    }, args);
    if (args.freq <= 0) {
      el.animate({
        bottom: args.vdist
      }, args.time, callback);
    }
    curVdist = 0;
    curTime = 0;
    tickLen = args.time / args.freq;
    vPerTick = parseInt(args.vdist) / args.freq;
    x = 0;
    f = function() {
      var animationArgs;
      animationArgs = {
        bottom: "+=" + vPerTick + "px"
      };
      if (args.attr === 'right') {
        animationArgs.right = x === 0 ? (x % 2 === 0 ? "+=" : "-=") + ("" + args.hdist + "px") : (x % 2 === 0 ? "+=" : "-=") + ("" + (args.hdist * 2) + "px");
      } else {
        animationArgs.left = x === 0 ? (x % 2 === 0 ? "+=" : "-=") + ("" + args.hdist + "px") : (x % 2 === 0 ? "+=" : "-=") + ("" + (args.hdist * 2) + "px");
      }
      el.animate(animationArgs, tickLen, function() {
        x++;
        curTime += tickLen;
        if (x > args.freq) {
          args.callback();
        } else {
          f();
        }
      });
    };
    f();
  };
})(jQuery);
