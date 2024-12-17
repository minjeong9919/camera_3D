import * as THREE from "three";
import { plastic } from "../texture/plastic.js";

export const shutter = () => {
  const shutterGroup = new THREE.Group();
  const plasticMaterial = plastic();

  const radiusTop = 0.15;
  const radiusBottom = 0.3;
  const buttonBottomHeight = 0.1;
  const buttonHeight = 0.3;
  const radialSegment = 13;
  const buttonBottomGeometry = new THREE.CylinderGeometry(
    radiusTop,
    radiusBottom,
    buttonBottomHeight,
    radialSegment
  );

  const buttonBottom = new THREE.Mesh(buttonBottomGeometry, plasticMaterial);
  buttonBottom.position.y = 1.03;
  buttonBottom.position.x = -1.5;
  shutterGroup.add(buttonBottom);

  const buttonGeometry = new THREE.CylinderGeometry(
    radiusTop,
    radiusTop,
    buttonHeight,
    30
  );

  const button = new THREE.Mesh(buttonGeometry, plasticMaterial);
  button.position.y = 1.04;
  button.position.x = -1.5;
  shutterGroup.add(button);
  button.name = "shutter";

  return shutterGroup;
};
