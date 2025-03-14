import * as THREE from "three";
import { env } from "./env.js";

export const metal = () => {
  const textureLoader = new THREE.TextureLoader();
  const envMap = env();

  const colorMap = textureLoader.load(
    "../../public/images/metal/Metal_scratched_002_COLOR.jpg"
  );
  const normalMap = textureLoader.load(
    "../../public/images/metal/Metal_scratched_008_normal.jpg"
  );
  const roughnessMap = textureLoader.load(
    "../../public/images/metal/Metal_scratched_008_roughness.jpg"
  );
  const metalnessMap = textureLoader.load(
    "../../public/images/metal/Metal_scratched_008_metallic.jpg"
  );

  colorMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapS = THREE.RepeatWrapping;
  metalnessMap.wrapS = THREE.RepeatWrapping;

  colorMap.wrapT = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  metalnessMap.wrapT = THREE.RepeatWrapping;

  colorMap.repeat.set(0.5, 0.5);
  normalMap.repeat.set(0.5, 0.5);
  roughnessMap.repeat.set(0.5, 0.5);
  metalnessMap.repeat.set(0.5, 0.5);

  const metarial = new THREE.MeshStandardMaterial({
    color: 0xdcdada,
    map: colorMap,
    normalMap: normalMap,
    envMap: envMap,
    roughnessMap: roughnessMap,
    metalnessMap: metalnessMap,
    metalness: 0,
    roughness: 0,
  });

  return metarial;
};
