@initCanvas = () ->
	stage = new Kinetic.Stage {
		container: 'c',
		width: 600,
		height: 100
	}

	layer = new Kinetic.Layer()

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
		layer.draw()
	rect.on 'mouseout', ->
		@setOpacity 0.4
		document.body.style.cursor = 'default'
		layer.draw()

	layer.add rect
	stage.add layer