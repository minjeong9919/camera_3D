import * as THREE from "three";

export const smallButtons = () => {
  const buttonMaterial = new THREE.MeshStandardMaterial({
    color: "#3d3d3d",
    side: THREE.DoubleSide,
  });

  const extrudeSettings = {
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelOffset: 0,
    bevelSegments: 10,
  };

  const buttonGroup = new THREE.Group();

  const circleShape = new THREE.Shape();
  circleShape.ellipse(0, 0, 0.05, 0.05);

  const enterGeometry = new THREE.ExtrudeGeometry(circleShape, extrudeSettings);
  const enter = new THREE.Mesh(enterGeometry, buttonMaterial);
  enter.position.z = -0.56;
  enter.position.y = -0.3;
  enter.position.x = -1;

  const smallButton1 = enter.clone();
  smallButton1.position.z = -0.53;
  smallButton1.position.y = 0.5;
  smallButton1.position.x = -0.8;

  const smallButton2 = smallButton1.clone();
  smallButton2.position.y = 0.3;

  const smallButton3 = smallButton1.clone();
  smallButton3.position.y = 0.1;

  const smallButton4 = smallButton1.clone();
  smallButton4.position.y = -0.68;

  const smallButton5 = smallButton1.clone();
  smallButton5.position.y = -0.68;
  smallButton5.position.x = -1.2;

  buttonGroup.add(smallButton1);
  buttonGroup.add(smallButton2);
  buttonGroup.add(smallButton3);
  buttonGroup.add(smallButton4);
  buttonGroup.add(smallButton5);

  return buttonGroup;
};
