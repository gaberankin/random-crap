class @Timeline
	container: null
	d3Element: null
	svg: null
	x: null
	xAxis: null
	groups: 
		xAxis: null
		segments: null
	behaviors:
		segmentDrag: null
		timeFormat: null
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


		@svg = @d3Element.append('svg')
		@svg.attr('width', @container.width()).attr('height', @container.height())
		@groups.segments = @svg.append('g')
			.attr('transform', "translate(#{@margin.left},#{@margin.top})")
			.attr('id', "segments-#{@container.attr('id')}")

		if seconds > 0
			@setDuration seconds

		me = @
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

	addSegment: (x, width) ->
		id = "rect-#{@container.attr('id')}-#{@segmentsIdx}"
		@segmentsIdx++
		segment = @groups.segments.append('rect')
			.attr('class', 'timesegment')
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
			@groups.xAxis =  @svg.append('g')
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
