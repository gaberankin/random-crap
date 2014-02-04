class @Timeline
	container: null
	d3Element: null
	svg: null
	x: null
	xAxis: null
	groups: 
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


		@svg = @d3Element.append('svg')
		@svg.attr('width', @container.width()).attr('height', @container.height())
		@svg.append('g')
    		.attr('transform', "translate(#{@margin.left},#{@margin.top})")
    		.attr('id', 'idontknow')

		if seconds > 0
			@setDuration seconds

	addSegment: (segment) ->
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
