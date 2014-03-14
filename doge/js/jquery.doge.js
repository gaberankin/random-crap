(function($) {
  var dogeHeadLeft, dogeHeadLeftDown, dogeHeadLeftUp, dogeHeadRight, dogeHeadRightDown, dogeHeadRightUp, heads;
  dogeHeadRight = function(doge) {
    var head;
    head = this;
    doge.css({
      right: "0",
      left: "auto"
    }).animate({
      bottom: "0"
    }, function() {
      $(this).animate({
        bottom: "-" + (head.h / 5) + "px"
      }, 100, function() {
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
    }).animate({
      bottom: "0"
    }, function() {
      $(this).animate({
        bottom: "-" + (head.h / 5) + "px"
      }, 100, function() {
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
    });
  };
  dogeHeadLeftDown = dogeHeadRight;
  dogeHeadLeftUp = dogeHeadRight;
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
})(jQuery);