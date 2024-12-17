import * as THREE from "three";
import { createCylinderWidthRoundedEdge } from "../shapes/createCylinderWithRoundedEdge.js";
import { metal } from "../texture/metal.js";

export const body = () => {
  const group = new THREE.Group();
  const textureLoader = new THREE.TextureLoader();

  const bodyHeight = 2;
  const metalMaterial = metal();

  const body = createCylinderWidthRoundedEdge(3, 0.5);

  const bodyExtrudeSettings = {
    depth: bodyHeight - 0.03,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 2,
    bevelSize: 0.02,
    bevelThickness: 0.03,
  };

  const bodyGeometry = new THREE.ExtrudeGeometry(body, bodyExtrudeSettings);
  const bodyMesh = new THREE.Mesh(bodyGeometry, metalMaterial);
  bodyMesh.position.y = bodyHeight / 2;
  bodyMesh.rotation.x = Math.PI / 2;
  group.add(bodyMesh);

  const leatherMap = textureLoader.load(
    "../public/images/Leather_005_roughness.jpg",
    (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
    }
  );

  const subBodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x514f4f,
    side: THREE.DoubleSide,
    flatShading: false,
    map: leatherMap,
  });
  const subBody = createCylinderWidthRoundedEdge(3.01, 0.501);

  const subBodyExtrudeSettings = {
    depth: bodyHeight - 0.4,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 2,
    bevelSize: 0.02,
    bevelThickness: 0.03,
  };

  const subBodyGeometry = new THREE.ExtrudeGeometry(
    subBody,
    subBodyExtrudeSettings
  );
  const subBodyMesh = new THREE.Mesh(subBodyGeometry, subBodyMaterial);
  subBodyMesh.position.y = bodyHeight / 2 - 0.015 - 0.25;
  subBodyMesh.rotation.x = Math.PI / 2;
  group.add(subBodyMesh);

  return group;
};
