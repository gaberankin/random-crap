
(($) ->
	revString = (str) ->
		len = str.length;
		retVal = ''		
		for x in [(len - 1)..0]
			retVal += str.charAt(x)
		retVal

	$.fn.backwards = (options) ->

		@.filter(':input').keyup((e) ->
			$me = $(this)
			$parent = $me.parent('.backwards-wrap')
			$('.backwards-text', $parent).text(revString($me.val()))
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
