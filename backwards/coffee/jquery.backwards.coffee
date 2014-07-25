
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
			$me.wrap('<div style="position:relative; display:inline-block;" class="backwards-wrap"></div>')
			$parent = $me.parent('.backwards-wrap')
			$text = $('<div class="backwards-text"></div>').appendTo($parent).css({
				padding: $me.css('padding')
				zIndex: 2
				position: 'absolute'
				maxWidth: $me.outerWidth()
				height: $me.outerHeight()
				overflow: 'hidden'
			}).click(()->
				$me.get(0).focus()
			)
			$me.css({
				position: 'absolute',
				zIndex: 1
			})
			$parent.css({
				width: $me.outerWidth()
				height: $me.outerHeight()
			})
			return
		)

) jQuery
