// Generated by CoffeeScript 1.6.3
(function() {
  this.TimelineStage = (function() {
    TimelineStage.prototype.opts = {
      width: null,
      height: 75,
      duration: 6000,
      widthPerSecond: 100,
      rectOpacity: 0.4,
      rectHoverOpacity: 0.8,
      container: 'c',
      mouseMove: function(arg1, arg2, arg3) {}
    };

    TimelineStage.prototype.stage = null;

    TimelineStage.prototype.text_layer = null;

    TimelineStage.prototype.rect_layer = null;

    TimelineStage.prototype.pos = {
      layer: null,
      group: null,
      text: null,
      shape: null,
      padding: 3
    };

    function TimelineStage(config) {
      var i, me, t, _i, _ref, _ref1;
      this.config = config;
      this.opts = jQuery.extend(this.opts, this.config);
      this.opts.width = this.calcWidth(this.opts.width, this.opts.duration, this.opts.widthPerSecond);
      this.stage = new Kinetic.Stage({
        container: this.opts.container,
        width: this.opts.width,
        height: this.opts.height
      });
      this.text_layer = new Kinetic.Layer({
        id: 'text-layer'
      });
      for (i = _i = 0, _ref = this.opts.width, _ref1 = this.opts.widthPerSecond; _ref1 > 0 ? _i <= _ref : _i >= _ref; i = _i += _ref1) {
        t = new Kinetic.Text({
          text: i,
          align: 'right',
          fill: 'black',
          x: 0,
          y: i
        });
        this.text_layer.add(t);
      }
      this.rect_layer = new Kinetic.Layer({
        id: 'rect-layer'
      });
      this.pos.layer = new Kinetic.Layer({
        id: 'pos-layer'
      });
      this.pos.group = new Kinetic.Group({
        id: 'pos-group',
        x: 0,
        y: 0
      });
      this.pos.text = new Kinetic.Text({
        id: 'pos-text',
        text: '',
        fill: 'black',
        x: this.pos.padding + 1,
        y: this.pos.padding + 1
      });
      this.pos.shape = new Kinetic.Rect({
        id: 'pos-shape',
        width: 50,
        height: 15,
        fill: '#BBF',
        stroke: 'black',
        strokeWidth: 1,
        x: 1,
        y: 1
      });
      this.pos.layer.add(this.pos.group);
      this.pos.group.add(this.pos.shape);
      this.pos.group.add(this.pos.text);
      this.stage.add(this.pos.layer);
      this.stage.add(this.rect_layer);
      this.stage.add(this.text_layer);
      this.addRect(0);
      me = this;
      this.stage.on('contentMousemove', function() {
        return me.movePosMarker(this.pointerPos.x);
      });
    }

    TimelineStage.prototype.addRect = function(x) {
      var rect;
      rect = new TimelineSegment(this.rect_layer, jQuery.extend({
        x: x
      }, this.opts));
      return rect;
    };

    TimelineStage.prototype.movePosMarker = function(x) {
      var sw, tw, w;
      this.pos.text.setText(x);
      tw = this.pos.text.getWidth();
      sw = this.stage.getWidth();
      w = ((this.pos.padding + 1) * 2) + tw;
      this.pos.shape.setWidth(w);
      this.pos.shape.setHeight(((this.pos.padding + 1) * 2) + this.pos.text.getHeight());
      this.pos.group.setX(x + w > sw ? sw - w : x);
      return this.pos.layer.batchDraw();
    };

    TimelineStage.prototype.calcWidth = function(width, duration, pxPerSecond) {
      if (width !== null) {
        return width;
      } else {
        return (duration / 1000) * pxPerSecond;
      }
    };

    TimelineStage.prototype.formatSeconds = function(seconds) {
      return seconds;
    };

    return TimelineStage;

  })();

}).call(this);

/*
//@ sourceMappingURL=TimelineStage.map
*/
