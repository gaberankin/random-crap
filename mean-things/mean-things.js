var MeanThings = null;
if(jQuery) {
	MeanThings = (function($){
		var MT = {};

		MT.spin = function(duration){
			if(!duration || duration < 100) {
				duration = 2000;
			}
			function rotate(dur) {
				// modified version of http://www.reddit.com/r/javascript/comments/1gp8am/javascript_pranks/camkt42
				var degrees = this.notRotated ? 359 : 0;
				this.notRotated = !this.notRotated;
				$('html').css({
					'-webkit-transform':'rotate(-' + degrees + 'deg)',
					'-moz-transform':'rotate(-' + degrees + 'deg)',
					'-ms-transform':'rotate(-' + degrees + 'deg)',
					'-o-transform':'rotate(-' + degrees + 'deg)',
					'transform':'rotate(-' + degrees + 'deg)',

					'-webkit-transition': dur + 's',
					'-moz-transition': dur + 's',
					'-ms-transition': dur + 's',
					'-o-transition': dur + 's',
					'transition': dur + 's',

					'-webkit-transform-origin':'50% 50%',
					'-moz-transform-origin':'50% 50%',
					'-ms-transform-origin':'50% 50%',
					'-o-transform-origin':'50% 50%',
					'transform-origin':'50% 50%',
					'-webkit-backface-visibility':'hidden'
				});
			}

			this.spinTimer = setInterval(function(){
				try {
					rotate(duration / 1000);
				} catch(e) {
					MT.spinStop();
				}
			}, duration);
		}

		MT.spinStop = function(){
			if(this.spinTimer) {
				clearInterval(this.spinTimer);
			}
		}


		return MT;
	})(jQuery);
}