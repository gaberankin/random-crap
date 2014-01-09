@initCanvas = () ->
	canvas_width = 600
	canvas_height = 100
	stage = new Kinetic.Stage {
		container: 'c',
		width: canvas_width,
		height: canvas_height
	}

	text_layer = new Kinetic.Layer({id:'text-layer'})

	for i in [0..canvas_width] by 100
		t = new Kinetic.Text {
			text: i,
			align: 'right',
			fill: 'black',
			x: 0, y: i
		}
		text_layer.add t

	rect_layer = new Kinetic.Layer({id:'rect-layer'})

	rect = new Kinetic.Rect {
		x: 20, y: 20,
		width: 50, height: 30,
		fill: 'green', stroke: 'black',
		strokeWidth: 2,
		opacity: 0.4,
		draggable: true,
		dragBoundFunc: (pos) ->
			{
				x: pos.x,
				y: @getAbsolutePosition().y
			}
	}

	rect.on 'mouseover', ->
		@setOpacity 1
		document.body.style.cursor = 'pointer'
		rect_layer.draw()
	rect.on 'mouseout', ->
		@setOpacity 0.4
		document.body.style.cursor = 'default'
		rect_layer.draw()


	rect_layer.add rect

	stage.add text_layer
	stage.add rect_layer
	stage