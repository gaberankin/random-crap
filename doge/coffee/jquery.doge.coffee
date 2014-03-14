
(($) ->
	dogeHeadRight = (doge)->
		head = @
		doge.css(
			right: "0"
			left: "auto"
		).animate
			bottom: "0"
		, ->
			$(this).animate
				bottom: "-#{head.h / 5}px"
			, 100, ->
				offset = (($(this).position().left) + head.w)
				$(this).delay(300).animate
					right: offset
				, 2200, ->
					doge.css(
						bottom: "-#{head.h}px"
						left: "auto"
						right: "0"
						top: "auto"
					)
					doge.attr('data-locked','0')
					return
				return
			return
		return

	dogeHeadRightDown = dogeHeadRight
	dogeHeadRightUp = dogeHeadRight
	dogeHeadLeft = (doge) ->
		head = @
		doge.css(
			right: "auto"
			left: "0"
		).animate
			bottom: "0"
		, ->
			$(this).animate
				bottom: "-#{head.h / 5}px"
			, 100, ->
				offset = ($(window).width() + head.w)
				$(this).delay(300).animate
					left: offset
				, 2200, ->
					doge.css(
						bottom: "-#{head.h}px"
						left: "auto"
						right: "0"
						top: "auto"
					)
					doge.attr('data-locked','0')
					return
				return
			return
		return
	dogeHeadLeftDown = dogeHeadRight
	dogeHeadLeftUp = dogeHeadRight



	heads = [
			fn: dogeHeadRight
			src: 'doge-head-right'
			w: 250
			h: 265
		,
			fn: dogeHeadRightDown
			src: 'doge-head-right-down'
			w: 265
			h: 250
		,
			fn: dogeHeadRightUp
			src: 'doge-head-right-up'
			w:265
			h:250
		,
			fn: dogeHeadLeft
			src: 'doge-head-left'
			w: 250
			h: 265
		,
			fn: dogeHeadLeftDown
			src: 'doge-head-left-down'
			w: 265
			h: 250
		,
			fn: dogeHeadLeftUp
			src: 'doge-head-left-up'
			w: 265
			h: 250
	]

	$.fn.doge = (options) ->
		#Yo' defaults
		defaults =
			enterOn: "click" #timer, click
			delayTime: 5000 #time before doge sneaks in on timer mode
			imagePath: ''

		dogeImageMarkup = '<img id="the-doge" style="display: none" src="#" />'
		doge = $(dogeImageMarkup).appendTo("body")

		#Extend those options
		options = $.extend(defaults, options)
		@each ->

			_this = $(this)
			
			# Animating Code
			init = ->
				if doge.attr('data-locked') == '1'
					return
				hIndex = Math.floor(Math.random() * heads.length)
				head = heads[hIndex]
				console.log head

				doge
					.attr('data-locked','1')
					.attr("src", (if options.imagePath then "#{options.imagePath}/" else '') + head.src + '.png')
					.css(
						position: "fixed"
						bottom: "-#{head.h}px"
						right: "0"
						display: "block"
					)
				# Movement Hilarity	
				try
					head.fn.apply(head, [doge])
				catch e
					doge.attr('data-locked','0')
					console.error(e)
				

				return
			
			#Determine Entrance
			if options.enterOn is "timer"
				setTimeout init, options.delayTime
			else if options.enterOn is "click"
				_this.bind "click", (e) ->
					e.preventDefault()
					init() unless doge.attr('data-locked') == '1'
					return
			return


	return

) jQuery
