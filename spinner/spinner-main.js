$(document).ready(function(){
	$('#spinner').keydown(arrowKeyUpdate).keypress(checkNumeric);
});

function checkNumeric(e)
{
	'use strict';
	var k = e.which;

	if(k < 48 || k > 57)
		e.preventDefault();
}

function arrowKeyUpdate(e)
{
	'use strict';
	var k = e.which;
	var $me = $(e.currentTarget);
	var v = parseInt($me.val());

	if(k == 38)
	{
		$me.val(v + 1);
		e.preventDefault();
	}
	else if(k == 40)
	{
		$me.val(v - 1);
		e.preventDefault();
	}
}