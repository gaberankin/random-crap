var renderer = null, camera = null, scene = null, loader = null, skinnedMesh = null, clock = null;
var $container = null, $debug = null, fpsInterval = 1000 / 60;

var setup = function(){
	var WIDTH = 400,
		HEIGHT = 300;
	var VIEW_ANGLE = 45,
		ASPECT = WIDTH/HEIGHT,
		NEAR = 0.1,
		FAR = 10000;

	$container = $('#container');
	$debug = $('#debug');
	loader = new THREE.JSONLoader;
	renderer = new THREE.WebGLRenderer();
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene = new THREE.Scene();

	scene.add(camera);
	camera.position.x = 150;
	camera.position.y = 150;
	camera.position.z = 150;
	camera.lookAt(new THREE.Vector3( 0, 0, 0 ))
	renderer.setSize(WIDTH, HEIGHT);
	$container.append(renderer.domElement);
	clock = new THREE.Clock();

	var light = new THREE.AmbientLight(0xfffff3, 0.8);
	var light2 = new THREE.PointLight( 0xff0000, 1, 800 );
	light2.position.set(new THREE.Vector3( 0, 150, 150 ))
	// var shadowCaster = new THREE.SpotLight(0xfffff3, 0.8);
	// shadowCaster.position.set(camera.position);
	// shadowCaster.castShadow = true;
	// shadowCaster.onlyShadow = true;
	// shadowCaster.distance = 400;
	// shadowCaster.target
	// light.position.set(100 * (3/4),200 * (3/4),100 * (3/4));
	scene.add(light);
	scene.add(light2);
	console.log(fpsInterval);
	loader.load('./js/dumb-box.js', function (geometry, materials) {
		skinnedMesh = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
		// skinnedMesh.position.y = 50;
		skinnedMesh.scale.set(15, 15, 15);
		scene.add(skinnedMesh);

		setInterval(function(){
			skinnedMesh.rotateY(clock.getDelta());
			renderer.render(scene, camera);
		}, fpsInterval);

	});

	$(document).keydown(function(event){
		console.log(event.which)
		if(event.which == 87) {
			camera.fov += 0.5;
			camera.updateProjectionMatrix();
		} else if(event.which == 83) {
			camera.fov -= 0.5;
			camera.updateProjectionMatrix();
		}
		$('#debug').text(camera.fov);
	});

};

$(document).ready(function(){
	setup();
});