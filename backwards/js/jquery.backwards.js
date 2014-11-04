(function($) {
  var getTime, revString, revString1, revString2, revString3, testString, tests;
  testString = 'bingly bingly beep backwards';
  revString = function(str) {
    return str;
  };

  /*
  	we have 3 different implementations of 1 thing.  this is because some browsers do better with 
  	some implementations.
   */
  revString1 = function(str) {
    var len, retVal, x, _i, _ref;
    len = str.length;
    retVal = '';
    for (x = _i = _ref = len - 1; _ref <= 0 ? _i <= 0 : _i >= 0; x = _ref <= 0 ? ++_i : --_i) {
      retVal += str.charAt(x);
    }
    return retVal;
  };
  revString2 = function(str) {
    var retVal;
    retVal = str.split('').reverse().join('');
    return retVal;
  };
  revString3 = function(str) {
    var halfIndex, i, len, retVal, s, tmp, _i;
    s = str.split('');
    len = s.length;
    halfIndex = Math.floor(len / 2) - 1;
    for (i = _i = 0; 0 <= halfIndex ? _i <= halfIndex : _i >= halfIndex; i = 0 <= halfIndex ? ++_i : --_i) {
      tmp = s[len - i - 1];
      s[len - i - 1] = s[i];
      s[i] = tmp;
    }
    retVal = s.join('');
    return retVal;
  };

  /*
  	Try to use the modern window.performance.now() for the performance test.
   */
  if (window.performance !== void 0 && window.performance.now !== void 0) {
    getTime = function() {
      return window.performance.now();
    };
  } else {
    getTime = function() {
      return (new Date()).getTimestamp();
    };
  }

  /*
  	Run the tests for each implementation
   */
  tests = {
    revString1: (function(str) {
      var d, x, _i;
      d = getTime();
      for (x = _i = 0; _i <= 10; x = ++_i) {
        revString1(str);
      }
      return getTime() - d;
    })(testString),
    revString2: (function(str) {
      var d, x, _i;
      d = getTime();
      for (x = _i = 0; _i <= 10; x = ++_i) {
        revString2(str);
      }
      return getTime() - d;
    })(testString),
    revString3: (function(str) {
      var d, x, _i;
      d = getTime();
      for (x = _i = 0; _i <= 10; x = ++_i) {
        revString3(str);
      }
      return getTime() - d;
    })(testString)
  };
  if (tests.revString1 <= tests.revString2 && tests.revString1 <= tests.revString3) {
    revString = revString1;
  } else if (tests.revString2 <= tests.revString1 && tests.revString2 <= tests.revString3) {
    revString = revString2;
  } else if (tests.revString3 <= tests.revString1 && tests.revString3 <= tests.revString2) {
    revString = revString3;
  }
  return $.fn.backwards = function(options) {
    return this.filter(':input').keyup(function(e) {
      var $me, $parent;
      $me = $(this);
      $parent = $me.parent('.backwards-wrap');
      $('.backwards-text', $parent).text(revString($me.val()));
      revString2($me.val());
      revString3($me.val());
    }).css({
      'color': 'transparent'
    }).each(function() {
      var $me, $parent, $text, left, top;
      $me = $(this);
      left = (($me.outerWidth() - $me.width()) / 2) + parseInt($me.css('margin-left'));
      top = (($me.outerHeight() - $me.height()) / 2) + parseInt($me.css('margin-top'));
      $me.wrap('<div style="position:relative; display:inline-block;" class="backwards-wrap"></div>');
      $parent = $me.parent('.backwards-wrap');
      $text = $('<div class="backwards-text"></div>').appendTo($parent).css({
        top: top,
        left: left,
        zIndex: 2,
        position: 'absolute',
        maxWidth: $me.width(),
        height: $me.height(),
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }).click(function() {
        $me.get(0).focus();
      });
      if ($me.css('font')) {
        $text.css('font', $me.css('font'));
      } else {
        if ($me.css('font-family')) {
          $text.css('font-family', $me.css('font-family'));
        }
        if ($me.css('font-size')) {
          $text.css('font-size', $me.css('font-size'));
        }
      }
      if ($me.css('font-weight')) {
        $text.css('font-weight', $me.css('font-weight'));
      }
      if ($me.css('font-style')) {
        $text.css('font-style', $me.css('font-style'));
      }
      $me.css({
        position: 'absolute',
        zIndex: 1
      });
      $parent.css({
        width: $me.outerWidth()
      });
    });
  };
})(jQuery);
