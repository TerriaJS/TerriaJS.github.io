const THREE = require('three');

const HEIGHT = 450;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.up = new THREE.Vector3(0, 1, 0);
camera.rotation.x = 75 * Math.PI / 180;
camera.position.z = 50;


function makePlane(geometry){
  var material = new THREE.MeshLambertMaterial({color: 0xffffff, shading: THREE.FlatShading});
  let terrain = new THREE.Mesh( geometry, material);
  return terrain;
}

function init(){
  let renderer = new THREE.WebGLRenderer({antialiasing: true, alpha: true});
  scene.fog = new THREE.FogExp2(0x222228, 0.003);
  renderer.setSize( window.innerWidth, HEIGHT );
  let container = document.getElementById('terrain');
  container.appendChild( renderer.domElement );

  makeLights();

  scene.add( makePlane(makePlaneGeometry(window.innerWidth, HEIGHT, 100, 80)));
  render(renderer);
}


var render = function (renderer) {
  // requestAnimationFrame( render.bind(null, renderer) );
  // camera.position.z += 0.1;
  // cube.rotation.y += 0.1;


  renderer.render(scene, camera);
};

function makePlaneGeometry(width, height, widthSegments, heightSegments) {
  let geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
  let X_OFFSET_DAMPEN = 0.5;
  let Y_OFFSET_DAMPEN = 0.1;
  let Z_OFFSET_DAMPEN = 0.1;
  let randSign = function() { return (Math.random() > 0.5) ? 1 : -1; };

  for (let vertIndex = 0; vertIndex < geometry.vertices.length; vertIndex++) {
    geometry.vertices[vertIndex].x += Math.random() / X_OFFSET_DAMPEN * randSign();
    geometry.vertices[vertIndex].y += Math.random() / Y_OFFSET_DAMPEN * randSign();
    geometry.vertices[vertIndex].z += Math.random() / Z_OFFSET_DAMPEN * randSign();
  }

  geometry.dynamic = true;
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  geometry.normalsNeedUpdate = true;
  return geometry;
}

var makeLights = function() {
  var ambientLight = new THREE.AmbientLight(0x262626);
  scene.add(ambientLight);

  var dirLight = new THREE.DirectionalLight(0xdfe8ef, 0.09);
  dirLight.position.set(5, 2, 1);
  scene.add(dirLight);
};

init();
