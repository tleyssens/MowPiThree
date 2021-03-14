var scene, renderer, camera;
var cube;
var controls;

init();
animate();

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    // LIGHTS
    //scene.add(new THREE.AmbientLight(0x222222));
    const light1 = new THREE.SpotLight(0xffffff, 5, 1000);
    light1.position.set(200, 250, 500);
    light1.angle = 0.5;
    light1.penumbra = 0.5;

    light1.castShadow = true;
    light1.shadow.mapSize.width = 1024;
    light1.shadow.mapSize.height = 1024;

    // scene.add( new THREE.CameraHelper( light1.shadow.camera ) );
    scene.add(light1);

    //CUBE
    var cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
    var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x1ec876 });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.set(0, 0, 0);
    scene.add(cube);

    //  GROUND
    const gt = new THREE.TextureLoader().load("grasslight-big.jpg");
    const gg = new THREE.PlaneGeometry(16000, 16000);
    const gm = new THREE.MeshPhongMaterial({ color: 0xffffff, map: gt });

    const ground = new THREE.Mesh(gg, gm);
    ground.rotation.x = - Math.PI / 2;
    ground.material.map.repeat.set(64, 64);
    ground.material.map.wrapS = THREE.RepeatWrapping;
    ground.material.map.wrapT = THREE.RepeatWrapping;
    ground.material.map.encoding = THREE.sRGBEncoding;
    // note that because the ground does not cast a shadow, .castShadow is left false
    ground.receiveShadow = true;
    scene.add(ground);

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.y = 160;
    camera.position.z = 400;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    var gridXZ = new THREE.GridHelper(100, 10);
    gridXZ.setColors(new THREE.Color(0xff0000), new THREE.Color(0xffffff));
    scene.add(gridXZ);

}

function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}