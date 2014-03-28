$(document).ready(function(){
	$('#doge1').doge({
		imagePath: 'javascripts',
		begin: function(){
			$('#doge1 h3').data('original-text', $('#doge1 h3').text()).text('much comedy');
		},
		complete: function(){
			$('#doge1 h3').text($('#doge1 h3').data('original-text'));
		}
	});
});