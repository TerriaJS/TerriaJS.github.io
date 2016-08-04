const THREE = require('three');

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

function makePlane(geometry){
  let material = new THREE.MeshBasicMaterial( {color: 0x00576b, wireframe: true});
  let terrain = new THREE.Mesh( geometry, material);
  return terrain;
}

function init(){
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  scene.add( makePlane(makePlaneGeometry(window.innerWidth, 400, 100, 100)));
  camera.position.z = 50;
  render(renderer);
}


var render = function (renderer) {
  //requestAnimationFrame( render.bind(null, renderer) );
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

init();
