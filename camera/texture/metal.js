import * as THREE from "three";

export const metal = () => {
  const textureLoader = new THREE.TextureLoader();
  const metalMap = textureLoader.load(
    "../../public/images/Metal_scratched_002_SPEC.jpg",
    (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
    }
  );

  return metalMap;
};
