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