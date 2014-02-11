class @Timeline
	container: null
	d3Element: null
	svg: null
	svgStage: null
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
	padding:
		top: 20
		right: 0
		bottom: 20
		left: 0
	size:
		width: 0
		height: 0

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
				el = d3.select(this)
				transX = d.x
				x = transX + d3.event.dx
				if x < 0
					return
				d.x = x
				el.datum(d)
				# el.select('.time-segment-position-text').text("#{me.behaviors.timeFormat(me.x.invert(x))}")
				# el.attr('transform', 'translate(' + x + ',0)')
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
		@size.width = @container.width() - @padding.right - @padding.left
		@size.height = @container.height() - @padding.top - @padding.bottom
		@svgStage = @d3Element.append('svg')
			.attr('class','timeline-stage')
			.attr('width', @container.width())
			.attr('height', @container.height())
		@groups.stage = @svgStage.append('g')
			.attr('id', "stage-#{@container.attr('id')}")
			.attr('transform', "translate(#{@padding.left}, #{@padding.top})")
		@svg = @groups.stage.append('svg').attr('class','timeline').call(@behaviors.zoom)
		@svg.attr('width', @size.width).attr('height', @size.height)
			# .call(@behaviors.zoom)
		@groups.segments = @groups.stage.append('g')
			.attr('id', "segments-#{@container.attr('id')}")
			# .attr('transform', "translate(#{@margin.left},#{@margin.top})")

		if seconds > 0
			@setDuration seconds

		@draw()()

	addSegment: (x, width) ->
		id = "segment-#{@container.attr('id')}-#{@segmentsIdx}"
		@segmentsIdx++
		me = @
		segment = @groups.segments
			.data([{'x' : parseInt(x), 'width' : parseInt(width)}])
			.append('g')
			.attr('class', 'time-segment')
			.attr('id', id)
			.attr('transform', (d) ->
				'translate(' + d.x + ',0)'
			)
			.attr('width', (d) ->
				d.width
			)
			.attr('height', @size.height)
			.call(@behaviors.segmentDrag)
		rect = segment.append('rect')
			.attr('class', 'time-segment-rect')
			.attr('id', id + '-rect')
			.attr('width', (d) ->
				d.width
			)
			.attr('height', @size.height)
		pos_text = segment.append('text')
			.attr('class', 'time-segment-position-text')
			.text((d) ->
				"#{me.behaviors.timeFormat(me.x.invert(d.x))}"
			)
		width_text = segment.append('text')
			.attr('class', 'time-segment-width-text')
			.text((d) ->
				"#{me.behaviors.timeFormat(me.x.invert(d.width))}"
			)
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
			.ticks(10)
			.tickFormat(d3.time.format('%H:%M:%S.%L'))
		if @groups.xAxis is null
			@groups.xAxis =  @svgStage.append('g')
				.attr('class', 'x axis')
				.attr('id', 'x-axis-group')
				.attr('transform', "translate(0, #{(@container.height() - @margin.top - @margin.bottom)})")
		@groups.xAxis.call(@xAxis)
		return

	draw: () ->
		me = @
		drawFunc = () ->
			tx = (d) ->
				return "translate(#{me.x(d)}, 0)"
			gx = me.svg.selectAll('g.x')
				.data(me.x.ticks(10), String)
				.attr('transform', tx)
			gxe = gx.enter().insert('g', 'a')
				.attr('class', 'x')
				.attr('transform', tx)
			gxe.append('line')
				.attr('stroke', '#ccc')
				.attr('y1', 0)
				.attr('y2', me.size.height)
			gxe.append('text')
				.attr('class', 'axis')
				.attr('y', me.size.height)
				.attr('dy', '1em')
				.attr('text-anchor', 'middle')
				.text(d3.time.format('%H:%M:%S.%L'))
				.style('cursor', 'ew-resize')
			gx.exit().remove()
			# me.update()

	randID: () ->
		text = "";
		possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for i in [0..20]
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		text;

class TimelineSegment
	timeline: null
	g: null
	rect: null
	pos_text: null
	width_text: null
	constructor: (timeline, id, x, width, drag) ->
		me = @
		@g = timeline.groups.segments
			.data([{'x' : parseInt(x), 'width' : parseInt(width)}])
			.append('g')
			.attr('class', 'time-segment')
			.attr('id', id)
			.attr('transform', @segmentX)
			.attr('width', @segmentW)
			.attr('height', timeline.size.height)
			.call(drag)
		@rect = @g.append('rect')
			.attr('class', 'time-segment-rect')
			.attr('id', id + '-rect')
			.attr('width', @segmentW)
			.attr('height', @size.height)
		@pos_text = @g.append('text')
			.attr('class', 'time-segment-position-text')
			.text(@segmentXText)
		@width_text = @g.append('text')
			.attr('class', 'time-segment-width-text')
			.text(@segmentWText)
	updateData: (x, width) ->
		me = @
		@g.datum({'x' : parseInt(x), 'width' : parseInt(width)})
			.attr('transform', @segmentX)
			.attr('width', @segmentW)
		@rect.attr('width', @segmentW)
		@pos_text.text(@segmentXText)
		@width_text.text(@segmentWText)
	segmentX: (d) ->
		return 'translate(' + d.x + ',0)'
	segmentXText: (d) ->
		return "#{me.timeline.behaviors.timeFormat(me.timeline.x.invert(d.x))}"
	segmentW: (d) ->
		return d.width
	segmentWText: (d) ->
		return "#{me.timeline.behaviors.timeFormat(me.timeline.x.invert(d.width))}"

