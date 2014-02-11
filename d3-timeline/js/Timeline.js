(function() {
  var TimelineSegment;

  this.Timeline = (function() {
    Timeline.prototype.container = null;

    Timeline.prototype.d3Element = null;

    Timeline.prototype.svg = null;

    Timeline.prototype.svgStage = null;

    Timeline.prototype.x = null;

    Timeline.prototype.xAxis = null;

    Timeline.prototype.groups = {
      stage: null,
      xAxis: null,
      segments: null
    };

    Timeline.prototype.behaviors = {
      segmentDrag: null,
      timeFormat: null,
      zoom: null
    };

    Timeline.prototype.duration = 0;

    Timeline.prototype.segments = [];

    Timeline.prototype.segmentsIdx = 0;

    Timeline.prototype.margin = {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    };

    Timeline.prototype.padding = {
      top: 20,
      right: 0,
      bottom: 20,
      left: 0
    };

    Timeline.prototype.size = {
      width: 0,
      height: 0
    };

    function Timeline(container, seconds) {
      var me;
      this.container = container;
      if (seconds == null) {
        seconds = 0;
      }
      if (typeof this.container === 'string') {
        this.container = $(this.container).find(':first');
      }
      if (this.container.attr('id') === '' || this.container.attr('id') === 'undefined') {
        this.container.attr('id', 't-' + this.randID());
      }
      this.d3Element = d3.select('#' + this.container.attr('id'));
      me = this;
      /* setup behaviors*/

      this.behaviors.timeFormat = d3.time.format('%H:%M:%S.%L');
      this.behaviors.segmentDrag = d3.behavior.drag().origin(Object).on('drag', function(d, i) {
        var el, transX, x;
        el = d3.select(this);
        transX = d.x;
        x = transX + d3.event.dx;
        if (x < 0) {
          return;
        }
        d.x = x;
        el.datum(d);
      }).on('dragstart', function() {
        d3.event.sourceEvent.stopPropagation();
        d3.select(this).classed('segment-dragging', true);
      }).on('dragend', function() {
        d3.select(this).classed('segment-dragging', false);
      });
      this.behaviors.zoom = d3.behavior.zoom().scaleExtent([0.1, 10]).on("zoom", function() {
        me.groups.stage.attr("transform", "scale(" + d3.event.scale + ", 1)");
      });
      /* setup drawing area*/

      this.size.width = this.container.width() - this.padding.right - this.padding.left;
      this.size.height = this.container.height() - this.padding.top - this.padding.bottom;
      this.svgStage = this.d3Element.append('svg').attr('class', 'timeline-stage').attr('width', this.container.width()).attr('height', this.container.height());
      this.groups.stage = this.svgStage.append('g').attr('id', "stage-" + (this.container.attr('id'))).attr('transform', "translate(" + this.padding.left + ", " + this.padding.top + ")");
      this.svg = this.groups.stage.append('svg').attr('class', 'timeline').call(this.behaviors.zoom);
      this.svg.attr('width', this.size.width).attr('height', this.size.height);
      this.groups.segments = this.groups.stage.append('g').attr('id', "segments-" + (this.container.attr('id')));
      if (seconds > 0) {
        this.setDuration(seconds);
      }
      this.draw()();
    }

    Timeline.prototype.addSegment = function(x, width) {
      var id, me, pos_text, rect, segment, width_text;
      id = "segment-" + (this.container.attr('id')) + "-" + this.segmentsIdx;
      this.segmentsIdx++;
      me = this;
      segment = this.groups.segments.data([
        {
          'x': parseInt(x),
          'width': parseInt(width)
        }
      ]).append('g').attr('class', 'time-segment').attr('id', id).attr('transform', function(d) {
        return 'translate(' + d.x + ',0)';
      }).attr('width', function(d) {
        return d.width;
      }).attr('height', this.size.height).call(this.behaviors.segmentDrag);
      rect = segment.append('rect').attr('class', 'time-segment-rect').attr('id', id + '-rect').attr('width', function(d) {
        return d.width;
      }).attr('height', this.size.height);
      pos_text = segment.append('text').attr('class', 'time-segment-position-text').text(function(d) {
        return "" + (me.behaviors.timeFormat(me.x.invert(d.x)));
      });
      width_text = segment.append('text').attr('class', 'time-segment-width-text').text(function(d) {
        return "" + (me.behaviors.timeFormat(me.x.invert(d.width)));
      });
      this.segments.push(segment);
    };

    Timeline.prototype.setDuration = function(seconds) {
      this.duration = seconds;
      this.x = d3.time.scale().domain([new Date('2014-01-01 00:00:00'), d3.time.second.offset(new Date('2014-01-01 00:00:00'), this.duration)]).range([0, this.duration]);
      this.xAxis = d3.svg.axis().scale(this.x).orient('bottom').ticks(10).tickFormat(d3.time.format('%H:%M:%S.%L'));
      if (this.groups.xAxis === null) {
        this.groups.xAxis = this.svgStage.append('g').attr('class', 'x axis').attr('id', 'x-axis-group').attr('transform', "translate(0, " + (this.container.height() - this.margin.top - this.margin.bottom) + ")");
      }
      this.groups.xAxis.call(this.xAxis);
    };

    Timeline.prototype.draw = function() {
      var drawFunc, me;
      me = this;
      return drawFunc = function() {
        var gx, gxe, tx;
        tx = function(d) {
          return "translate(" + (me.x(d)) + ", 0)";
        };
        gx = me.svg.selectAll('g.x').data(me.x.ticks(10), String).attr('transform', tx);
        gxe = gx.enter().insert('g', 'a').attr('class', 'x').attr('transform', tx);
        gxe.append('line').attr('stroke', '#ccc').attr('y1', 0).attr('y2', me.size.height);
        gxe.append('text').attr('class', 'axis').attr('y', me.size.height).attr('dy', '1em').attr('text-anchor', 'middle').text(d3.time.format('%H:%M:%S.%L')).style('cursor', 'ew-resize');
        return gx.exit().remove();
      };
    };

    Timeline.prototype.randID = function() {
      var i, possible, text, _i;
      text = "";
      possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (i = _i = 0; _i <= 20; i = ++_i) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };

    return Timeline;

  })();

  TimelineSegment = (function() {
    TimelineSegment.prototype.timeline = null;

    TimelineSegment.prototype.g = null;

    TimelineSegment.prototype.rect = null;

    TimelineSegment.prototype.pos_text = null;

    TimelineSegment.prototype.width_text = null;

    function TimelineSegment(timeline, id, x, width, drag) {
      var me;
      me = this;
      this.g = timeline.groups.segments.data([
        {
          'x': parseInt(x),
          'width': parseInt(width)
        }
      ]).append('g').attr('class', 'time-segment').attr('id', id).attr('transform', this.segmentX).attr('width', this.segmentW).attr('height', timeline.size.height).call(drag);
      this.rect = this.g.append('rect').attr('class', 'time-segment-rect').attr('id', id + '-rect').attr('width', this.segmentW).attr('height', this.size.height);
      this.pos_text = this.g.append('text').attr('class', 'time-segment-position-text').text(this.segmentXText);
      this.width_text = this.g.append('text').attr('class', 'time-segment-width-text').text(this.segmentWText);
    }

    TimelineSegment.prototype.updateData = function(x, width) {
      var me;
      me = this;
      this.g.datum({
        'x': parseInt(x),
        'width': parseInt(width)
      }).attr('transform', this.segmentX).attr('width', this.segmentW);
      this.rect.attr('width', this.segmentW);
      this.pos_text.text(this.segmentXText);
      return this.width_text.text(this.segmentWText);
    };

    TimelineSegment.prototype.segmentX = function(d) {
      return 'translate(' + d.x + ',0)';
    };

    TimelineSegment.prototype.segmentXText = function(d) {
      return "" + (me.timeline.behaviors.timeFormat(me.timeline.x.invert(d.x)));
    };

    TimelineSegment.prototype.segmentW = function(d) {
      return d.width;
    };

    TimelineSegment.prototype.segmentWText = function(d) {
      return "" + (me.timeline.behaviors.timeFormat(me.timeline.x.invert(d.width)));
    };

    return TimelineSegment;

  })();

}).call(this);
