$(document).ready ->
	$("#test, #test2").doge(
		enterOn: 'click'
		imagePath: 'js'
		begin: () ->
			$(this).attr('disabled', 'disabled')
		callback: () ->
			$(this).removeAttr('disabled');
	)
	return