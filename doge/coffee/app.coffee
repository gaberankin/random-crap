$(document).ready ->
	$("#test, #test2").doge(
		enterOn: 'timer'
		delayTime: 2000
		imagePath: 'js'
		begin: () ->
			$(this).attr('disabled', 'disabled')
		complete: () ->
			$(this).removeAttr('disabled');
	)
	return