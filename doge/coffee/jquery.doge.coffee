
(($) ->
	dogeHeadRight = (doge, el, callback)->
		head = @
		doge.css
			right: "0"
			left: "auto"

		shakeHorzMoveUp doge,
			vdist: head.h
			hdist: 5
			time: 2000
			callback: () ->
				doge.animate
					bottom: "0"
				, ->
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
						callback.apply(el)
						return
					return
				return
		return

	# dogeHeadRightDown = dogeHeadRight
	dogeHeadRightDown = (doge, el, callback) ->
		head = @
		doge.css
			bottom: "0"
			left: "auto"
		shakeVertMoveOut doge,
			hdist: head.w
			vdist: 5
			time: 2000
			callback: () ->
				doge.animate
					left: "0"
				, ->
					offset = (($(this).position().top) + head.h)
					$(this).delay(300).animate
						bottom: offset
					, 2200, ->
						doge.css(
							left: "-#{head.h}px"
							right: "auto"
							bottom: "0"
							top: "auto"
						)
						doge.attr('data-locked','0')
						callback.apply(el)
						return
					return
				return

	dogeHeadRightUp = dogeHeadRight
	dogeHeadLeft = (doge, el, callback) ->
		head = @
		doge.css
			right: "auto"
			left: "0"

		shakeHorzMoveUp doge,
			vdist: head.h
			hdist: 5
			time: 2000
			attr: 'left'
			callback: () ->
				doge.animate
					bottom: "0"
				, ->
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
						callback.apply(el)
						return
					return
				return
		return
	dogeHeadLeftDown = dogeHeadLeft
	dogeHeadLeftUp = dogeHeadLeft



	heads = [
			fn: dogeHeadRight
			src: 'doge-head-right'
			w: 250
			h: 265
		,
		# 	fn: dogeHeadRightDown
		# 	src: 'doge-head-right-down'
		# 	w: 265
		# 	h: 250
		# ,
		# 	fn: dogeHeadRightUp
		# 	src: 'doge-head-right-up'
		# 	w:265
		# 	h:250
		# ,
			fn: dogeHeadLeft
			src: 'doge-head-left'
			w: 250
			h: 265
		# ,
		# 	fn: dogeHeadLeftDown
		# 	src: 'doge-head-left-down'
		# 	w: 265
		# 	h: 250
		# ,
		# 	fn: dogeHeadLeftUp
		# 	src: 'doge-head-left-up'
		# 	w: 265
		# 	h: 250
	]

	$.fn.doge = (options) ->
		#Yo' defaults
		defaults =
			enterOn: "click" #timer, click
			delayTime: 5000 #time before doge sneaks in on timer mode
			imagePath: ''
			complete: $.noop
			begin: $.noop

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
				options.begin.apply(_this, [])
				hIndex = Math.floor(Math.random() * heads.length)
				head = heads[hIndex]

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
					head.fn.apply(head, [doge, _this, options.complete])
				catch e
					doge.attr('data-locked','0')
					console.error(e)
				

				return
			
			if options.enterOn is "timer"
				setTimeout init, options.delayTime
			else if options.enterOn is "click"
				_this.bind "click", (e) ->
					e.preventDefault()
					init() unless doge.attr('data-locked') == '1'
					return
			return


	shakeHorzMoveUp = (el, args = {}) ->
		args = $.extend({'vdist': 100, 'hdist': 10, 'freq': 100, 'time': 4000, 'callback': $.noop, 'attr': 'right'}, args)
		if args.freq <= 0
			el.animate
				bottom: args.vdist
			, args.time
			, callback
		curVdist = 0
		curTime = 0
		tickLen = args.time / args.freq
		vPerTick = parseInt(args.vdist) / args.freq
		x = 0
		f = () ->
			animationArgs =
				bottom: "+=#{vPerTick}px"
			if args.attr == 'right'
				animationArgs.right = if x == 0 then ((if x % 2 == 0 then "+=" else "-=") + "#{args.hdist}px" ) else ((if x % 2 == 0 then "+=" else "-=") + "#{args.hdist * 2}px")
			else
				animationArgs.left = if x == 0 then ((if x % 2 == 0 then "+=" else "-=") + "#{args.hdist}px" ) else ((if x % 2 == 0 then "+=" else "-=") + "#{args.hdist * 2}px")
			el.animate animationArgs, tickLen, () ->
				x++
				curTime += tickLen
				if x > args.freq
					args.callback()
				else
					f()
				return
			return
		f()
		return

	shakeVertMoveOut = (el, args = {}) ->
		args = $.extend({'vdist': 10, 'hdist': 100, 'freq': 100, 'time': 4000, 'callback': $.noop, 'attr': 'bottom'}, args)
		if args.freq <= 0
			el.animate
				left: args.hdist
			, args.time
			, callback
		curHdist = 0
		curTime = 0
		tickLen = args.time / args.freq
		hPerTick = parseInt(args.hdist) / args.freq
		x = 0
		f = () ->
			animationArgs =
				left: "+=#{hPerTick}px"
			if args.attr == 'bottom'
				animationArgs.bottom = if x == 0 then ((if x % 2 == 0 then "+=" else "-=") + "#{args.vdist}px" ) else ((if x % 2 == 0 then "+=" else "-=") + "#{args.vdist * 2}px")
			else
				animationArgs.top = if x == 0 then ((if x % 2 == 0 then "+=" else "-=") + "#{args.vdist}px" ) else ((if x % 2 == 0 then "+=" else "-=") + "#{args.vdist * 2}px")
			el.animate animationArgs, tickLen, () ->
				x++
				curTime += tickLen
				if x > args.freq
					args.callback()
				else
					f()
				return
			return
		f()
		return

	return
) jQuery
