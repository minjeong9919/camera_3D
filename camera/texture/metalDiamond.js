import * as THREE from "three";
import { env } from "./env.js";

export const metalDiamond = () => {
  const textureLoader = new THREE.TextureLoader();
  const envMap = env();

  const colorMap = textureLoader.load(
    "../../public/images/metal_diamond/Metal_Diamond_001_COLOR.jpg"
  );
  const normalMap = textureLoader.load(
    "../../public/images/metal_diamond/Metal_Diamond_001_NORM.jpg"
  );
  const roughnessMap = textureLoader.load(
    "../../public/images/metal_diamond/Metal_Diamond_001_ROUGH.jpg"
  );
  const metalnessMap = textureLoader.load(
    "../../public/images/metal_diamond/Metal_Diamond_001_OCC.jpg"
  );

  colorMap.colorSpace = THREE.SRGBColorSpace;

  colorMap.wrapT = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.RepeatWrapping;
  metalnessMap.wrapT = THREE.RepeatWrapping;

  colorMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapS = THREE.RepeatWrapping;
  metalnessMap.wrapS = THREE.RepeatWrapping;

  colorMap.repeat.set(5, 4);
  normalMap.repeat.set(5, 4);
  roughnessMap.repeat.set(5, 4);
  metalnessMap.repeat.set(5, 4);

  const material = new THREE.MeshStandardMaterial({
    // color: 0xdcdada,
    map: colorMap,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
    metalnessMap: metalnessMap,
    envMap: envMap,
    metalness: 0.3,
  });

  return material;
};
