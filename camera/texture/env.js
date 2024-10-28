import * as THREE from "three";

export const env = () => {
  const environmentLoader = new THREE.CubeTextureLoader();
  environmentLoader.setPath("../../node_modules/three/examples/pisa/");

  const textureCube = environmentLoader.load([
    "px.png",
    "nx.png",
    "py.png",
    "ny.png",
    "pz.png",
    "nz.png",
  ]);

  return textureCube;
};
