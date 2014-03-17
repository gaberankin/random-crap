(($) ->
	$.fn.wiggle = (options) ->
		defaults =
			time: 3000
			axis: 'x'
			frequency: 100
			distance: 5
			onComplete: $.noop
		options = $.extend(defaults, options)
		if options.time is 'slow'
			options.time = 3000
		else if options.time is 'fast'
			options.time = 1000

		options.axis = (options.axis + '').toLowerCase()

		if options.axis isnt 'x' and options.axis isnt 'y'
			if console isnt undefined
				console.error("#{options.axis} is an invalid axis.  Please specify x (horizontal) or y (vertical)")
			return @


		return @each ->
			if options.frequency == 0
				if console isnt undefined
					console.warn("the frequency for this wiggle was set to 0, so we're not actually going to do anything.", @)
				options.onComplete.apply(@);
				return

			if options.axis is 'x'
				_shake(@, options, 'left')
			else
				_shake(@, options, 'top')

			return

	_shake = (el, options, attr) ->
		tickLen = options.time / options.frequency
		dPerTick = parseInt(options.distance) / options.frequency
		now = new Date
		x = 0
		$el = $(el)
		f = () ->
			animationArgs = {}
			animationArgs[attr] = if x == 0 then ((if x % 2 == 0 then "+=" else "-=") + "#{options.distance}px" ) else ((if x % 2 == 0 then "+=" else "-=") + "#{options.distance * 2}px")
			$el.animate animationArgs, 
				duration: tickLen
				queue: false
				complete: () ->
					x++
					curTime += tickLen
					console.log curTime
					if x > options.freq or (new Date - now) >= options.time
						options.onComplete.apply(el)
					else
						f()
					return
			return
		f()
		return

	return
) jQuery