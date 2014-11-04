
(($) ->
	testString = 'bingly bingly beep backwards';

	revString = (str) ->
		str

	###
	we have 3 different implementations of 1 thing.  this is because some browsers do better with 
	some implementations.
	###
	revString1 = (str) ->
		len = str.length;
		retVal = ''		
		for x in [(len - 1)..0]
			retVal += str.charAt(x)
		retVal

	revString2 = (str) ->
		retVal = str.split('').reverse().join('')
		retVal

	revString3 = (str) ->
		s = str.split('')
		len = s.length
		halfIndex = Math.floor(len / 2) - 1
		for i in [0..halfIndex]
			tmp = s[len - i - 1];
			s[len - i - 1] = s[i];
			s[i] = tmp;
		retVal = s.join('')
		retVal

	###
	Try to use the modern window.performance.now() for the performance test.
	###
	if window.performance isnt undefined and window.performance.now isnt undefined
		getTime = () ->
			return window.performance.now()
	else
		getTime = () ->
			return (new Date()).getTimestamp()

	###
	Run the tests for each implementation
	###
	tests = 
		revString1: ((str) ->
			d = getTime()
			for x in [0..10]
				revString1(str)
			(getTime() - d))(testString)
		revString2: ((str) ->
			d = getTime()
			for x in [0..10]
				revString2(str)
			(getTime() - d))(testString)
		revString3: ((str) ->
			d = getTime()
			for x in [0..10]
				revString3(str)
			(getTime() - d))(testString)

	if tests.revString1 <= tests.revString2 and tests.revString1 <= tests.revString3
		revString = revString1
	else if tests.revString2 <= tests.revString1 and tests.revString2 <= tests.revString3
		revString = revString2
	else if tests.revString3 <= tests.revString1 and tests.revString3 <= tests.revString2
		revString = revString3

	$.fn.backwards = (options) ->

		@.filter(':input').keyup((e) ->
			$me = $(this)
			$parent = $me.parent('.backwards-wrap')
			$('.backwards-text', $parent).text(revString($me.val()));
			revString2($me.val());
			revString3($me.val());
			return
		).css({'color':'transparent'}).each(() ->
			$me = $(this)
			left = (($me.outerWidth() - $me.width()) / 2) + parseInt($me.css('margin-left'))
			top = (($me.outerHeight() - $me.height()) / 2) + parseInt($me.css('margin-top'))
			$me.wrap('<div style="position:relative; display:inline-block;" class="backwards-wrap"></div>')
			$parent = $me.parent('.backwards-wrap')
			$text = $('<div class="backwards-text"></div>').appendTo($parent).css({
				top: top
				left: left
				zIndex: 2
				position: 'absolute'
				maxWidth: $me.width()
				height: $me.height()
				overflow: 'hidden'
				whiteSpace: 'nowrap'
			}).click(()->
				$me.get(0).focus()
				return
			)
			if $me.css('font')
				$text.css('font', $me.css('font'))
			else
				if $me.css('font-family')
					$text.css('font-family', $me.css('font-family'))
				if $me.css('font-size')
					$text.css('font-size', $me.css('font-size'))
			if $me.css('font-weight')
				$text.css('font-weight', $me.css('font-weight'))
			if $me.css('font-style')
				$text.css('font-style', $me.css('font-style'))

			$me.css({
				position: 'absolute',
				zIndex: 1
			})
			$parent.css({
				width: $me.outerWidth()
				# height: $me.outerHeight()
			})
			return
		)

) jQuery
