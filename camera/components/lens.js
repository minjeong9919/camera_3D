import * as THREE from "three";
import { metal } from "../texture/metal.js";
import { env } from "../texture/env.js";

export const lens = () => {
  const LensGroup = new THREE.Group();

  const metalMaterial = metal();
  const envMap = env();

  const circleShape = new THREE.Shape();
  circleShape.absarc(0, 0, 0.65);

  const circleHole = new THREE.Shape();
  circleHole.absarc(0, 0, 0.6);

  circleShape.holes = [circleHole];

  const depth1 = 0.3;
  const depth2 = 0.5;

  const extrudeSettings1 = {
    depth: depth2,
    bevelEnabled: true,
    steps: 13,
    bevelSize: 0.06,
    bevelThickness: 0.1,
    bevelSegments: 7,
  };

  const extrudeSettings2 = {
    depth: depth1,
    bevelEnabled: true,
    steps: 13,
    bevelSize: 0.06,
    bevelThickness: 0.1,
    bevelSegments: 7,
  };

  const lensHole1 = new THREE.ExtrudeGeometry(circleShape, extrudeSettings1);
  const lensHole2 = new THREE.ExtrudeGeometry(circleShape, extrudeSettings2);
  const mesh1 = new THREE.Mesh(lensHole1, metalMaterial);
  const mesh2 = new THREE.Mesh(lensHole2, metalMaterial);
  mesh1.position.y = -0.03;
  mesh1.position.z = 1.6;
  mesh2.position.y = -0.03;
  mesh2.position.z = 0.5;
  LensGroup.add(mesh1);
  LensGroup.add(mesh2);

  const bodyGeometry = new THREE.CylinderGeometry(0.6, 0.52, 2, 32);
  const body = new THREE.Mesh(bodyGeometry, metalMaterial);
  body.rotateX(Math.PI / 2);
  body.position.z = 0.6;
  body.position.y = -0.05;
  LensGroup.add(body);

  const glassMeterial = new THREE.MeshPhysicalMaterial({
    metalness: 1,
    color: 0x686666,
    roughness: 0,
    envMap: envMap,
    envMapIntensity: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0,
    transmission: 0.9,
    opacity: 0.7,
    reflectivity: 0.3,
    thickness: 5,
    ior: 1.52,
    reflectivity: 0.5,
  });

  const lensGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.3, 31);
  const lens = new THREE.Mesh(lensGeometry, glassMeterial);
  lens.position.y = 1.3;
  body.add(lens);

  return LensGroup;
};
