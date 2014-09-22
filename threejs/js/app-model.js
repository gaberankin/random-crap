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

	// var light = new THREE.AmbientLight(0xfffff3, 0.8);
	var light2 = new THREE.PointLight( 0xffffff, 4, 800 );
	light2.position.set( 150, 150, 150 );
	light2.castShadow = true;
	// var shadowCaster = new THREE.SpotLight(0xfffff3, 0.8);
	// shadowCaster.position.set(camera.position);
	// shadowCaster.castShadow = true;
	// shadowCaster.onlyShadow = true;
	// shadowCaster.distance = 400;
	// // shadowCaster.target
	// // light.position.set(100 * (3/4),200 * (3/4),100 * (3/4));
	// scene.add(shadowCaster);
	scene.add(light2);

	loader.load('./js/dumb-box.js', function (geometry, materials) {
		skinnedMesh = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
		// skinnedMesh.position.y = 50;
		skinnedMesh.scale.set(15, 15, 15);
		scene.add(skinnedMesh);

		var x_line_geometry = new THREE.Geometry();
		x_line_geometry.vertices.push(new THREE.Vector3( 50, 0, 0 ), new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 0 ) );
		scene.add( new THREE.Line( x_line_geometry, new THREE.LineBasicMaterial({ color: 0x0000ff }) ) );

		var y_line_geometry = new THREE.Geometry();
		y_line_geometry.vertices.push(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 50, 0 ), new THREE.Vector3( 0, 0, 0 ) );
		scene.add( new THREE.Line( y_line_geometry, new THREE.LineBasicMaterial({ color: 0xffff00 }) ) );

		var z_line_geometry = new THREE.Geometry();
		z_line_geometry.vertices.push(new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 50 ) );
		scene.add( new THREE.Line( z_line_geometry, new THREE.LineBasicMaterial({ color: 0xff0000 }) ) );

		setInterval(function(){
			skinnedMesh.rotateY(clock.getDelta());
			renderer.render(scene, camera);
		}, fpsInterval);

	});

	$('#fov').val(camera.fov).change(function(){
		var val = parseFloat($(this).val().replace(/[^0-9\.]/g, ''));
		if(val) {
			camera.fov = val;
			camera.updateProjectionMatrix();
		}
	}).keydown(function(event){
		var fov = parseFloat($('#fov').val().replace(/[^0-9\.]/g, ''));
		if(event.which == 87) {
			fov += 0.5;
			$('#fov').val(fov).change();
			event.preventDefault();
		} else if(event.which == 83) {
			fov -= 0.5;
			$('#fov').val(fov).change();
			event.preventDefault();
		}
	});

};

$(document).ready(function(){
	setup();
});