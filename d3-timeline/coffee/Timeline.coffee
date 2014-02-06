class @Timeline
	container: null
	d3Element: null
	svg: null
	x: null
	xAxis: null
	groups:
		stage: null
		xAxis: null
		segments: null
	behaviors:
		segmentDrag: null
		timeFormat: null
		zoom: null
	duration: 0
	segments: []
	segmentsIdx: 0
	margin:
		top: 10
		right: 10
		bottom: 10
		left: 10

	constructor: (@container, seconds = 0) ->
		if typeof @container is 'string'
			@container = $(@container).find(':first')

		if @container.attr('id') == '' or @container.attr('id') == 'undefined'
			@container.attr('id', 't-' + @randID())
		@d3Element = d3.select('#' + @container.attr('id'))

		me = @
		### setup behaviors ###
		@behaviors.timeFormat = d3.time.format('%H:%M:%S.%L')
		@behaviors.segmentDrag = d3.behavior.drag()
			.origin(Object)
			.on 'drag', (d, i)->
				x = parseInt(d3.select(this).attr('x')) + d3.event.dx
				if x < 0
					return
				$('#debug').text("#{x}, #{me.behaviors.timeFormat(me.x.invert(x))}")
				d3.select(this).attr('x', x)
				return
			.on 'dragstart', () ->
				d3.event.sourceEvent.stopPropagation();
				d3.select(this).classed('segment-dragging', true)
				return
			.on 'dragend', () ->
				d3.select(this).classed('segment-dragging', false)
				return
		@behaviors.zoom = d3.behavior.zoom()
			.scaleExtent([0.1, 10])
			.on "zoom", () ->
				me.groups.stage.attr("transform", "scale(" + d3.event.scale + ", 1)")
				return

		### setup drawing area ###
		@svg = @d3Element.append('svg').attr('class','timeline').call(@behaviors.zoom)
		@svg.attr('width', @container.width()).attr('height', @container.height())
		@groups.stage = @svg.append('g')
			.attr('id', "stage-#{@container.attr('id')}")
			# .call(@behaviors.zoom)
		@groups.segments = @groups.stage.append('g')
			.attr('id', "segments-#{@container.attr('id')}")
			# .attr('transform', "translate(#{@margin.left},#{@margin.top})")

		if seconds > 0
			@setDuration seconds



	addSegment: (x, width) ->
		id = "rect-#{@container.attr('id')}-#{@segmentsIdx}"
		@segmentsIdx++
		segment = @groups.segments.append('rect')
			.attr('class', 'time-segment')
			.attr('id', id)
			.attr('x', x)
			.attr('y', 0)
			.attr('width', width)
			.attr('height', @container.height())
			.call(@behaviors.segmentDrag)
		
		@segments.push(segment)
		return

	setDuration: (seconds) ->
		@duration = seconds
		@x = d3.time.scale()
			.domain([new Date('2014-01-01 00:00:00'), d3.time.second.offset(new Date('2014-01-01 00:00:00'), @duration)])
			.range([0, @duration])
			# .rangeRound([0, @container.width() - @margin.left - @margin.right])
		@xAxis = d3.svg.axis()
			.scale(@x)
			.orient('bottom')
			.ticks(d3.time.seconds, 100000)
			.tickFormat(d3.time.format('%H:%M:%S.%L'))
		if @groups.xAxis is null
			@groups.xAxis =  @groups.stage.append('g')
				.attr('class', 'x axis')
				.attr('id', 'x-axis-group')
				.attr('transform', "translate(0, #{(@container.height() - @margin.top - @margin.bottom)})")
		@groups.xAxis.call(@xAxis)
		return

	randID: () ->
		text = "";
		possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for i in [0..20]
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		text;
