class @TimelineSegment
	opts: 
		x: 0
		duration: 1000	#in milliseconds
		rectOpacity: 0.4	#between 0 and 1
		rectHoverOpacity: 0.8	#between 0 and 1
	layer: null
	group: null
	shape: null
	delete_btn: null
	handles: [null, null]

	constructor: (@layer, config) ->
		me = @
		w = 50
		@opts = jQuery.extend @opts, config
		@group = new Kinetic.Group
			name: 'rect-group'
			x: @opts.x
			y: 0
			width: w
			height: @opts.height
			draggable: true
			dragBoundFunc: (pos) ->
				x: if pos.x >= 0 then pos.x else 0
				y: @getAbsolutePosition().y
		@delete_button = new Kinetic.Text
			text: 'X'
			x: w
			y: 0
			fill: 'black'
		@shape = new Kinetic.Rect
			x: 0
			y: 0
			width: w
			height: @opts.height
			fill: 'green'
			stroke: 'black'
			strokeWidth: 2
			opacity: @opts.rectOpacity
		@group.on 'mouseover', ->
			@setOpacity me.opts.rectHoverOpacity
			document.body.style.cursor = 'pointer'
			me.layer.draw()
		@group.on 'mouseout', ->
			@setOpacity me.opts.rectOpacity
			document.body.style.cursor = 'default'
			me.layer.draw()

		@delete_button.on 'click', ->
			me.group.destroy()
			me.layer.draw()

		@handles[0] = new Kinetic.Rect
			x: -2,
			y: (@opts.height / 2) - 2
			width: 4
			height: 4
			fill: 'blue'
		@handles[1] = new Kinetic.Rect
			x: w - 2,
			y: (@opts.height / 2) - 2
			width: 4
			height: 4
			fill: 'blue'


		@group.add @shape
		@group.add @delete_button
		@group.add @handles[0]
		@group.add @handles[1]

		@layer.add @group
		@layer.draw()
