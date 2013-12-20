var renderer = null;
var camera = null;
var scene = null;
var $container = null;
var $debug = null;

var setup = function(){
	var WIDTH = 400,
		HEIGHT = 300;
	var VIEW_ANGLE = 45,
		ASPECT = WIDTH/HEIGHT,
		NEAR = 0.1,
		FAR = 10000;

	$container = $('#container');
	$debug = $('#debug');
	renderer = new THREE.WebGLRenderer();
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene = new THREE.Scene();

	scene.add(camera);
	camera.position.z = 300;
	renderer.setSize(WIDTH, HEIGHT);
	$container.append(renderer.domElement);
};

var addSphere = function(radius, segments, rings, material){
	var sphere = new THREE.Mesh(
		new THREE.SphereGeometry(radius, segments, rings),
		material
	);
	scene.add(sphere);
	return sphere;
}

var addPointLight = function(x, y, z, color){
	var pointLight = new THREE.PointLight(color);
	pointLight.position.x = x;
	pointLight.position.y = y;
	pointLight.position.z = z;
	scene.add(pointLight);
	return pointLight;
}

Math.radians = function(deg) { return deg * (Math.PI / 180); };

$(document).ready(function(){
	setup();
	addSphere(50, 16, 16, new THREE.MeshLambertMaterial({color: 0xAA0000}));
	var light = addPointLight(10, 50, 130, 0xFFFFFF);

	console.log(light);

	var inc = 0;
	setInterval(function(){
		renderer.render(scene, camera);
		if(light.position.y >= 359) inc = 0;
		r = 50;
		rad = Math.radians(inc);
		light.position.x = r * Math.sin(rad);
		light.position.y = r * Math.cos(rad);
		$debug.text('light: (' + light.position.x + ',' + light.position.y + ')');
		inc++;
	}, 100);
})