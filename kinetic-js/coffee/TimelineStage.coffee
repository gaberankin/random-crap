class @TimelineStage
	opts: 
		width: null		#in pixels
		height: 75		#in pixels
		duration: 6000	#in milliseconds
		widthPerSecond: 100	#pixel width per second
		rectOpacity: 0.4	#between 0 and 1
		rectHoverOpacity: 0.8	#between 0 and 1
		container: 'c'		#DOM id of element to contain the stage
		mouseMove: (arg1, arg2, arg3) ->

	stage: null
	text_layer: null
	rect_layer: null
	pos:
		layer: null
		group: null
		text: null
		shape: null
		padding: 3

	constructor: (@config) ->
		@opts = jQuery.extend @opts, @config
		@opts.width = @calcWidth @opts.width, @opts.duration, @opts.widthPerSecond

		@stage = new Kinetic.Stage
			container: @opts.container
			width: @opts.width
			height: @opts.height
		@text_layer = new Kinetic.Layer({id:'text-layer'})
	
		for i in [0..@opts.width] by @opts.widthPerSecond
			t = new Kinetic.Text
				text: i
				align: 'right'
				fill: 'black'
				x: 0
				y: i
			@text_layer.add t

		@rect_layer = new Kinetic.Layer
			id:'rect-layer'

		#set up the line that moves with the mouse cursor
		@pos.layer = new Kinetic.Layer
			id: 'pos-layer'
		@pos.group = new Kinetic.Group 
			id: 'pos-group'
			x: 0
			y: 0
		@pos.text = new Kinetic.Text
			id: 'pos-text'
			text: ''
			fill: 'black'
			x: @pos.padding + 1
			y: @pos.padding + 1
		@pos.shape = new Kinetic.Rect
			id: 'pos-shape'
			width: 50
			height: 15
			fill: '#BBF'
			stroke: 'black'
			strokeWidth: 1
			x: 1
			y: 1
		@pos.layer.add @pos.group
		@pos.group.add @pos.shape
		@pos.group.add @pos.text

		@stage.add @pos.layer
		@stage.add @rect_layer
		@stage.add @text_layer

		@addRect 0


		me = @
		@stage.on 'contentMousemove', ->
			me.movePosMarker @.pointerPos.x

	addRect: (x) ->
		rect = new TimelineSegment @rect_layer, jQuery.extend { x: x }, @opts
		# me = @
		# group = new Kinetic.Group
		# 	name: 'rect-group'
		# 	x: x
		# 	y: 0
		# 	width: 50
		# 	height: @opts.height
		# 	draggable: true
		# 	dragBoundFunc: (pos) ->
		# 		x: if pos.x >= 0 then pos.x else 0
		# 		y: @getAbsolutePosition().y
		# delete_button = new Kinetic.Text
		# 	text: 'X'
		# 	x: x + 50
		# 	y: 0
		# 	fill: 'black'
		# rect = new Kinetic.Rect
		# 	x: 0
		# 	y: 0
		# 	width: 50
		# 	height: @opts.height
		# 	fill: 'green'
		# 	stroke: 'black'
		# 	strokeWidth: 2
		# 	opacity: @opts.rectOpacity

		# group.on 'mouseover', ->
		# 	@setOpacity me.opts.rectHoverOpacity
		# 	document.body.style.cursor = 'pointer'
		# 	me.rect_layer.draw()
		# group.on 'mouseout', ->
		# 	@setOpacity me.opts.rectOpacity
		# 	document.body.style.cursor = 'default'
		# 	me.rect_layer.draw()

		# delete_button.on 'click', ->
		# 	group.destroy()
		# 	me.rect_layer.draw()

		# group.add rect
		# group.add delete_button

		# @rect_layer.add group
		# @rect_layer.draw()
		rect

	movePosMarker: (x) ->
		@pos.text.setText x
		tw = @pos.text.getWidth()
		sw = @stage.getWidth()
		w = ((@pos.padding + 1) * 2) + tw
		@pos.shape.setWidth w
		@pos.shape.setHeight ((@pos.padding + 1) * 2) + @pos.text.getHeight()
		@pos.group.setX if x + w > sw then sw - w else x
		@pos.layer.batchDraw()

	calcWidth: (width, duration, pxPerSecond) ->
		if width != null then width else (duration / 1000) * pxPerSecond

	formatSeconds: (seconds) ->
		seconds
