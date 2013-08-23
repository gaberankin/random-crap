var p = (window.parent) ? window.parent : window;

function sendMessage(){
	p.postMessage({'my':'object'}, '*');
}
window.onload = function(){
	document.getElementById('post-message').addEventListener('click', sendMessage, false);
}

window.addEventListener('message', function(event) {
	console.log(event);
	if(event.origin != 'http://local.js-test.com') return;
}, false);
