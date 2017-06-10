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
