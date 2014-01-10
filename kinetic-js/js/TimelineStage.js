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
      container: 'c'
    };

    TimelineStage.prototype.stage = null;

    TimelineStage.prototype.text_layer = null;

    TimelineStage.prototype.rect_layer = null;

    TimelineStage.prototype.line = {
      layer: null,
      group: null,
      text: null,
      shape: null
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
      this.line.layer = new Kinetic.Layer({
        id: 'line-layer'
      });
      this.line.group = new Kinetic.Group({
        id: 'line-group',
        x: 0,
        y: 0
      });
      this.line.text = new Kinetic.Text({
        id: 'line-text',
        text: '',
        fill: 'black',
        x: 0,
        y: 0
      });
      this.line.shape = new Kinetic.Line({
        id: 'line-shape',
        points: [[1, 0], [1, this.opts.height]],
        stroke: 'black',
        strokeWidth: 1
      });
      this.line.layer.add(this.line.group);
      this.line.group.add(this.line.shape);
      this.line.group.add(this.line.text);
      this.stage.add(this.line.layer);
      this.stage.add(this.rect_layer);
      this.stage.add(this.text_layer);
      this.addRect(0);
      me = this;
      this.stage.on('contentMousemove', function() {
        return me.moveLine(this.pointerPos.x);
      });
    }

    TimelineStage.prototype.addRect = function(x) {
      var delete_button, group, me, rect;
      me = this;
      group = new Kinetic.Group({
        name: 'rect-group',
        x: x,
        y: 0,
        width: 50,
        height: this.opts.height,
        draggable: true,
        dragBoundFunc: function(pos) {
          return {
            x: pos.x >= 0 ? pos.x : 0,
            y: this.getAbsolutePosition().y
          };
        }
      });
      delete_button = new Kinetic.Text({
        text: 'X',
        x: x + 50,
        y: 0,
        fill: 'black'
      });
      rect = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: 50,
        height: this.opts.height,
        fill: 'green',
        stroke: 'black',
        strokeWidth: 2,
        opacity: this.opts.rectOpacity
      });
      group.on('mouseover', function() {
        this.setOpacity(me.opts.rectHoverOpacity);
        document.body.style.cursor = 'pointer';
        return me.rect_layer.draw();
      });
      group.on('mouseout', function() {
        this.setOpacity(me.opts.rectOpacity);
        document.body.style.cursor = 'default';
        return me.rect_layer.draw();
      });
      delete_button.on('click', function() {
        group.destroy();
        return me.rect_layer.draw();
      });
      group.add(rect);
      group.add(delete_button);
      this.rect_layer.add(group);
      this.rect_layer.draw();
      return rect;
    };

    TimelineStage.prototype.moveLine = function(x) {
      this.line.text.setText(x);
      this.line.group.setX(x);
      return this.line.layer.batchDraw();
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
