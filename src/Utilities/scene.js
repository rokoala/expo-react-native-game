import * as THREE from 'three';
import Assets from '../Assets'

export const createBackground = (width, height)=>{
  const blueBackground = new THREE.BoxGeometry(width,height,0);
  const blueBackgroundTexture = new THREE.MeshBasicMaterial({
    color: 0x35b3c6
  });
  const meshBG = new THREE.Mesh(blueBackground, blueBackgroundTexture);
  meshBG.position.z = -40;
  meshBG.rotation.z = Math.PI;
  return meshBG;
}

const loadImageMaterial = (assetName, THREEView) => {
  const texture = THREEView.textureFromAsset(Assets[assetName]);
  texture.minFilter = texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  const material = new THREE.MeshBasicMaterial({
    map:texture,
    transparent:true,
  });
  return material;
}

export const createPlane = (THREEView) => {
  const planeGeo = new THREE.PlaneBufferGeometry(50, 50);
  const material = loadImageMaterial("player-sprite", THREEView);
  const planeMesh = new THREE.Mesh(planeGeo, material);
  return planeMesh;
}

export const createStart = (THREEView) => {
  const startGeo = new THREE.PlaneBufferGeometry(475, 200);
  const material = loadImageMaterial("start-screen", THREEView);
  const startMesh = new THREE.Mesh(startGeo, material);
  startMesh.position.y = 300;
  return startMesh;
}
