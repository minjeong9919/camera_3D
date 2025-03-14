import * as THREE from "three";

export const plastic = () => {
  const material = new THREE.MeshStandardMaterial({
    color: "#3d3d3d",
    side: THREE.DoubleSide,
    roughness: 0.4,
    metalness: 0,
  });

  return material;
};
