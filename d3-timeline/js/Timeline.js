(function() {
  this.Timeline = (function() {
    Timeline.prototype.container = null;

    Timeline.prototype.d3Element = null;

    Timeline.prototype.svg = null;

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
        var x;
        x = parseInt(d3.select(this).attr('x')) + d3.event.dx;
        if (x < 0) {
          return;
        }
        $('#debug').text("" + x + ", " + (me.behaviors.timeFormat(me.x.invert(x))));
        d3.select(this).attr('x', x);
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

      this.svg = this.d3Element.append('svg').attr('class', 'timeline').call(this.behaviors.zoom);
      this.svg.attr('width', this.container.width()).attr('height', this.container.height());
      this.groups.stage = this.svg.append('g').attr('id', "stage-" + (this.container.attr('id')));
      this.groups.segments = this.groups.stage.append('g').attr('id', "segments-" + (this.container.attr('id')));
      if (seconds > 0) {
        this.setDuration(seconds);
      }
    }

    Timeline.prototype.addSegment = function(x, width) {
      var id, segment;
      id = "rect-" + (this.container.attr('id')) + "-" + this.segmentsIdx;
      this.segmentsIdx++;
      segment = this.groups.segments.append('rect').attr('class', 'time-segment').attr('id', id).attr('x', x).attr('y', 0).attr('width', width).attr('height', this.container.height()).call(this.behaviors.segmentDrag);
      this.segments.push(segment);
    };

    Timeline.prototype.setDuration = function(seconds) {
      this.duration = seconds;
      this.x = d3.time.scale().domain([new Date('2014-01-01 00:00:00'), d3.time.second.offset(new Date('2014-01-01 00:00:00'), this.duration)]).range([0, this.duration]);
      this.xAxis = d3.svg.axis().scale(this.x).orient('bottom').ticks(d3.time.seconds, 100000).tickFormat(d3.time.format('%H:%M:%S.%L'));
      if (this.groups.xAxis === null) {
        this.groups.xAxis = this.groups.stage.append('g').attr('class', 'x axis').attr('id', 'x-axis-group').attr('transform', "translate(0, " + (this.container.height() - this.margin.top - this.margin.bottom) + ")");
      }
      this.groups.xAxis.call(this.xAxis);
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

}).call(this);
