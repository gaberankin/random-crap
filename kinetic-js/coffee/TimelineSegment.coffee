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
	handles: 
		east: 
			shape: null
			curX: 
				abs: 0
				rel: 0
		west:
			shape: null
			curX:
				abs: 0
				rel: 0
	handleSize: 8

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
			# fill: 'green'
			fillLinearGradientStartPoint:
				x: 0
				y: 0
			fillLinearGradientEndPoint:
				x: 0
				y: @opts.height
			fillLinearGradientColorStops: [0, '#00ff00', 0.5, '#00aa00', 1, '#008800']
			# stroke: 'black'
			# strokeWidth: 2
			opacity: @opts.rectOpacity
		@shape.on 'mouseover', ->
			document.body.style.cursor = 'col-resize'
		@shape.on 'mouseout', ->
			document.body.style.cursor = 'default'
		@group.on 'mouseover', ->
			@setOpacity me.opts.rectHoverOpacity
			me.layer.draw()
		@group.on 'mouseout', ->
			@setOpacity me.opts.rectOpacity
			me.layer.draw()

		@delete_button.on 'mouseover', ->
			@setFill 'red'
			document.body.style.cursor = 'pointer'
		@delete_button.on 'mouseout', ->
			@setFill 'black'
			document.body.style.cursor = 'default'
		@delete_button.on 'click', ->
			if confirm 'Really delete this break?'
				me.group.destroy()
				me.layer.draw()

		@handles.west.shape = new Kinetic.Rect jQuery.extend @handleOpts('west'),
			x: -1 * (@handleSize / 2)
		@handles.east.shape = new Kinetic.Rect jQuery.extend @handleOpts('east'),
			x: w - (@handleSize / 2)

		@handles.west.shape.on 'mouseover', ->
			@setFill 'red'
			document.body.style.cursor = 'w-resize';
			me.layer.draw()
		@handles.west.shape.on 'mouseout', ->
			@setFill 'blue'
			document.body.style.cursor = 'default';
			me.layer.draw()
		@handles.west.shape.on 'dragmove', @dragMoveCallback @handles.west.shape
		@handles.west.shape.on 'dragstart', ->
			me.handles.west.curX.abs = me.handles.west.shape.getAbsolutePosition().x;
			me.handles.west.curX.rel = me.handles.west.shape.getX();
			me.handles.east.curX.abs = me.handles.east.shape.getAbsolutePosition().x;
			me.handles.east.curX.rel = me.handles.east.shape.getX();
		@handles.east.shape.on 'mouseover', ->
			@setFill 'red'
			document.body.style.cursor = 'e-resize';
			me.layer.draw()
		@handles.east.shape.on 'mouseout', ->
			@setFill 'blue'
			document.body.style.cursor = 'default';
			me.layer.draw()
		@handles.east.shape.on 'dragmove', @dragMoveCallback @handles.east.shape
		@handles.east.shape.on 'dragstart', ->
			me.handles.west.curX.abs = me.handles.west.shape.getAbsolutePosition().x;
			me.handles.west.curX.rel = me.handles.west.shape.getX();
			me.handles.east.curX.abs = me.handles.east.shape.getAbsolutePosition().x;
			me.handles.east.curX.rel = me.handles.east.shape.getX();


		@group.add @shape
		@group.add @delete_button
		@group.add @handles.west.shape
		@group.add @handles.east.shape

		@layer.add @group
		@layer.draw()

	handleOpts: (name) ->
		me = @
		boundFunc = (pos) ->
		switch name
			when 'east'
				boundFunc = (pos) ->
					west = me.handles.west.shape.getAbsolutePosition().x
					x: if pos.x > me.handles.west.shape.getAbsolutePosition().x then pos.x else (west + 1)
					y: @getAbsolutePosition().y
			when 'west'
				boundFunc = (pos) ->
					east = me.handles.east.shape.getAbsolutePosition().x
					x: if pos.x >= 0 and pos.x < east then pos.x else (if pos.x <= 0 then 0 else east - 1)
					y: @getAbsolutePosition().y

		width: @handleSize
		height: @handleSize
		y: (@opts.height / 2) - (@handleSize / 2)
		fill: 'blue'
		name: name
		draggable: true
		dragBoundFunc: boundFunc

	dragMoveCallback: (handle) ->
		func = ->	#defaults to blank function
		me = @
		switch handle.getName()
			when 'east'
				func = ->
					west = me.handles.west.shape.getAbsolutePosition().x - me.handleSize / 2
					east = @getAbsolutePosition().x - me.handleSize / 2
					dist = east - west;
					me.shape.setWidth dist
					me.group.setWidth dist

					shape_width = me.shape.getWidth()
					delete_width = me.delete_button.getWidth()
					me.delete_button.setX shape_width - delete_width
					return
			when 'west'
				func = ->
					west = @getAbsolutePosition().x - me.handleSize / 2
					east = me.handles.east.shape.getAbsolutePosition().x - me.handleSize / 2
					me.shape.setWidth east - west
					# me.shape.setX west
					me.group.setWidth east - west
					me.group.setX west
					# me.handles.east.shape.setX 
					$('#debug').text(me.handles.east.curX.abs + ', ' + east + ', ' + (me.handles.west.curX.abs - west))
					$('#debug2').text(east)
					new_east = me.handles.east.curX.rel + (me.handles.west.curX.abs - west)
					me.handles.east.shape.setX new_east

					shape_width = me.shape.getWidth()
					delete_width = me.delete_button.getWidth()
					me.delete_button.setX shape_width - delete_width

					return
		return func
			