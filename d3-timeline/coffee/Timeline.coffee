class @Timeline
	container: null
	d3Element: null
	svg: null
	x: null
	xAxis: null
	duration: 0
	segments: []
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
		@x = d3.time.scale()
			.domain([new Date('2014-01-01 00:00:00'), d3.time.second.offset(new Date('2014-01-01 00:00:00'), seconds)])
			.rangeRound([0, @container.width() - @margin.left - @margin.right])

		@xAxis = d3.svg.axis()
			.scale(@x)
			.orient('bottom')
			.ticks(d3.time.seconds, 100000)
			.tickFormat(d3.time.format('%H:%M:%S.%L'))

		if seconds > 0
			@setDuration seconds

		@svg = @d3Element.append('svg')
		@svg.attr('width', @container.width()).attr('height', @container.height())
		@svg.append('g')
    		.attr('transform', "translate(#{@margin.left},#{@margin.top})")
		@svg.append('g')
			.attr('class', 'x axis')
			.attr('transform', "translate(0, #{(@container.height() - @margin.top - @margin.bottom)})")
			.call(@xAxis);
	addSegment: (segment) ->
		@segments.push(segment)
		return

	setDuration: (seconds) ->
		@duration = 1000
		@x.range [0, @duration]

	randID: () ->
		text = "";
		possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for i in [0..20]
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		text;
