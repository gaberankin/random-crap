var AdBreak = Backbone.Model.extend({
	'defaults': {
		'cuepoint': 0.0,
		'duration': 0.0,
		'content_skip': null
	},
	'cuepoint' : function(t) {
		this.set('cuepoint', parseFloat(t));
	},
	'duration': function(t) {
		this.set('duration', parseFloat(t));
	},
	'content_skip': function(t) {
		this.set('content_skip', parseFloat(t));
	}
});
var AdBreakView = Backbone.View.extend({
	'tagName' : 'div',
	'className' : 'AdBreak',
	'events': {

	},
	'initialize': function() {
		this.listenTo(this.model, "change", this.render);
	},
	'render': function() {

	}
});
var AdBreakTimeline = Backbone.Collection.extend({
	'model': AdBreak,
	'initialize': function(models, options) {
		options || (options = {});
		if (!options.duration) {
			options.duration = 600;	//default to 10 minutes.
		}
		this.duration = options.duration;
	}
});
var AdBreakTimelineView = Backbone.View.extend({
	'duration': 0.0,
	'divide': 20,
	// 'el': $('#timeline'),
	'events': {

	},
	'initialize': function() {
		this.collection = new AdBreakTimeline([], {'duration': this.duration});
		this.collection.bind('add', this.appendAdBreak);
		this.width = this.$el.width();
		this.height = this.$el.height();
		this.canvas = $('<canvas width="'+this.width+'" height="'+this.height+'"></canvas>').appendTo(this.$el).get(0);
		this.canvas_context = this.canvas.getContext("2d");
		if(this.duration > 0)
		{
			var duration_interval = this.duration / this.divide;
			for(i = 0; i <= this.duration; i += duration_interval)
			{
				this.fillTimestamp(i);
			}
		}
	},
	'render': function() {

	},
	'fillTimestamp': function(timestamp) {
		var p = timestamp / this.duration;
		var x = p * width;
		this.canvas_context.font = "10px sans-serif";
		this.canvas_context.save();
		this.canvas_context.translate(x, this.height);
		this.canvas_context.rotate(-Math.PI/2);
		this.canvas_context.fillText("" + timestamp, 2, 0);
		this.canvas_context.restore();

	},
	'addAdBreak': function(adbreak) {
		this.collection.add(adbreak);
	},
	'appendAdBreak': function(adbreak) {

	}

});