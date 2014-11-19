// Generated by CoffeeScript 1.6.3
(function() {
  this.TimelineSegment = (function() {
    TimelineSegment.prototype.opts = {
      x: 0,
      duration: 1000,
      rectOpacity: 0.4,
      rectHoverOpacity: 0.8
    };

    TimelineSegment.prototype.layer = null;

    TimelineSegment.prototype.group = null;

    TimelineSegment.prototype.shape = null;

    TimelineSegment.prototype.delete_btn = null;

    TimelineSegment.prototype.handles = {
      east: {
        shape: null,
        curX: {
          abs: 0,
          rel: 0
        }
      },
      west: {
        shape: null,
        curX: {
          abs: 0,
          rel: 0
        }
      }
    };

    TimelineSegment.prototype.handleSize = 8;

    function TimelineSegment(layer, config) {
      var me, w;
      this.layer = layer;
      me = this;
      w = 50;
      this.opts = jQuery.extend(this.opts, config);
      this.group = new Kinetic.Group({
        name: 'rect-group',
        x: this.opts.x,
        y: 0,
        width: w,
        height: this.opts.height,
        draggable: true,
        dragBoundFunc: function(pos) {
          return {
            x: pos.x >= 0 ? pos.x : 0,
            y: this.getAbsolutePosition().y
          };
        }
      });
      this.delete_button = new Kinetic.Text({
        text: 'X',
        x: w,
        y: 0,
        fill: 'black'
      });
      this.shape = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: w,
        height: this.opts.height,
        fillLinearGradientStartPoint: {
          x: 0,
          y: 0
        },
        fillLinearGradientEndPoint: {
          x: 0,
          y: this.opts.height
        },
        fillLinearGradientColorStops: [0, '#00ff00', 0.5, '#00aa00', 1, '#008800'],
        opacity: this.opts.rectOpacity
      });
      this.shape.on('mouseover', function() {
        return document.body.style.cursor = 'col-resize';
      });
      this.shape.on('mouseout', function() {
        return document.body.style.cursor = 'default';
      });
      this.group.on('mouseover', function() {
        this.setOpacity(me.opts.rectHoverOpacity);
        return me.layer.draw();
      });
      this.group.on('mouseout', function() {
        this.setOpacity(me.opts.rectOpacity);
        return me.layer.draw();
      });
      this.delete_button.on('mouseover', function() {
        this.setFill('red');
        return document.body.style.cursor = 'pointer';
      });
      this.delete_button.on('mouseout', function() {
        this.setFill('black');
        return document.body.style.cursor = 'default';
      });
      this.delete_button.on('click', function() {
        if (confirm('Really delete this break?')) {
          me.group.destroy();
          return me.layer.draw();
        }
      });
      this.handles.west.shape = new Kinetic.Rect(jQuery.extend(this.handleOpts('west'), {
        x: -1 * (this.handleSize / 2)
      }));
      this.handles.east.shape = new Kinetic.Rect(jQuery.extend(this.handleOpts('east'), {
        x: w - (this.handleSize / 2)
      }));
      this.handles.west.shape.on('mouseover', function() {
        this.setFill('red');
        document.body.style.cursor = 'w-resize';
        return me.layer.draw();
      });
      this.handles.west.shape.on('mouseout', function() {
        this.setFill('blue');
        document.body.style.cursor = 'default';
        return me.layer.draw();
      });
      this.handles.west.shape.on('dragmove', this.dragMoveCallback(this.handles.west.shape));
      this.handles.west.shape.on('dragstart', function() {
        me.handles.west.curX.abs = me.handles.west.shape.getAbsolutePosition().x;
        me.handles.west.curX.rel = me.handles.west.shape.getX();
        me.handles.east.curX.abs = me.handles.east.shape.getAbsolutePosition().x;
        return me.handles.east.curX.rel = me.handles.east.shape.getX();
      });
      this.handles.east.shape.on('mouseover', function() {
        this.setFill('red');
        document.body.style.cursor = 'e-resize';
        return me.layer.draw();
      });
      this.handles.east.shape.on('mouseout', function() {
        this.setFill('blue');
        document.body.style.cursor = 'default';
        return me.layer.draw();
      });
      this.handles.east.shape.on('dragmove', this.dragMoveCallback(this.handles.east.shape));
      this.handles.east.shape.on('dragstart', function() {
        me.handles.west.curX.abs = me.handles.west.shape.getAbsolutePosition().x;
        me.handles.west.curX.rel = me.handles.west.shape.getX();
        me.handles.east.curX.abs = me.handles.east.shape.getAbsolutePosition().x;
        return me.handles.east.curX.rel = me.handles.east.shape.getX();
      });
      this.group.add(this.shape);
      this.group.add(this.delete_button);
      this.group.add(this.handles.west.shape);
      this.group.add(this.handles.east.shape);
      this.layer.add(this.group);
      this.layer.draw();
    }

    TimelineSegment.prototype.handleOpts = function(name) {
      var boundFunc, me;
      me = this;
      boundFunc = function(pos) {};
      switch (name) {
        case 'east':
          boundFunc = function(pos) {
            var west;
            west = me.handles.west.shape.getAbsolutePosition().x;
            return {
              x: pos.x > me.handles.west.shape.getAbsolutePosition().x ? pos.x : west + 1,
              y: this.getAbsolutePosition().y
            };
          };
          break;
        case 'west':
          boundFunc = function(pos) {
            var east;
            east = me.handles.east.shape.getAbsolutePosition().x;
            return {
              x: pos.x >= 0 && pos.x < east ? pos.x : (pos.x <= 0 ? 0 : east - 1),
              y: this.getAbsolutePosition().y
            };
          };
      }
      return {
        width: this.handleSize,
        height: this.handleSize,
        y: (this.opts.height / 2) - (this.handleSize / 2),
        fill: 'blue',
        name: name,
        draggable: true,
        dragBoundFunc: boundFunc
      };
    };

    TimelineSegment.prototype.dragMoveCallback = function(handle) {
      var func, me;
      func = function() {};
      me = this;
      switch (handle.getName()) {
        case 'east':
          func = function() {
            var delete_width, dist, east, shape_width, west;
            west = me.handles.west.shape.getAbsolutePosition().x - me.handleSize / 2;
            east = this.getAbsolutePosition().x - me.handleSize / 2;
            dist = east - west;
            me.shape.setWidth(dist);
            me.group.setWidth(dist);
            shape_width = me.shape.getWidth();
            delete_width = me.delete_button.getWidth();
            me.delete_button.setX(shape_width - delete_width);
          };
          break;
        case 'west':
          func = function() {
            var delete_width, east, new_east, shape_width, west;
            west = this.getAbsolutePosition().x - me.handleSize / 2;
            east = me.handles.east.shape.getAbsolutePosition().x - me.handleSize / 2;
            me.shape.setWidth(east - west);
            me.group.setWidth(east - west);
            me.group.setX(west);
            $('#debug').text(me.handles.east.curX.abs + ', ' + east + ', ' + (me.handles.west.curX.abs - west));
            $('#debug2').text(east);
            new_east = me.handles.east.curX.rel + (me.handles.west.curX.abs - west);
            me.handles.east.shape.setX(new_east);
            shape_width = me.shape.getWidth();
            delete_width = me.delete_button.getWidth();
            me.delete_button.setX(shape_width - delete_width);
          };
      }
      return func;
    };

    return TimelineSegment;

  })();

}).call(this);

/*
//@ sourceMappingURL=TimelineSegment.map
*/