@time = null
me = @
@initEditor = (el, duration = 0, breaks = []) ->
	me.time = new Timeline el, duration
	for b in breaks
		me.time.addSegment b

	me.time
$(document).ready () ->
	$('#init').click (e) ->
		initEditor $('#c'), 3600
		e.preventDefault()
		return true
	$('#addSegment').submit (e) ->
		e.preventDefault()
		x = $('#x-input').val()
		w = $('#w-input').val()
		if x is '' or w is ''
			alert 'please enter an x and width value'
			return
		me.time.addSegment x, w