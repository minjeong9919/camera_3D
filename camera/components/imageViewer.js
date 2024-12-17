import * as THREE from "three";
import { createBoxWithRoundedEdges } from "../shapes/createBoxWithRoundedEdge.js";
import { env } from "../texture/env.js";

export const imageViewer = () => {
  const textureLoader = new THREE.TextureLoader();
  const map = textureLoader.load("../../public/images/profile.jpg");
  const envMap = env();
  map.repeat.set(0.5, 0.5);

  const material = new THREE.MeshStandardMaterial({
    color: "#ddd",
    side: THREE.DoubleSide,
    map: map,
    envMap: envMap,
  });
  const geometry = createBoxWithRoundedEdges(1.8, 1.3, 0.05, 0.05, 1);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = -0.05;
  mesh.position.x = 0.3;
  mesh.position.z = -0.5;

  return mesh;
};
