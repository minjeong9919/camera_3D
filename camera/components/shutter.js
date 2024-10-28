import * as THREE from "three";

export const shutter = () => {
	const buttonShape = new THREE.Shape();
	const bodyMaterial = new THREE.MeshStandardMaterial({
		color: "gray",
		side: THREE.DoubleSide,
	});
	buttonShape.ellipse(0, 0, 0.2, 0.2);

	const extrudeSettings = {
		depth: 0.1,
		bevelEnabled: true,
		steps: 13,
		bevelSize: 0.06,
		bevelThickness: 0.1,
		bevelSegments: 7,
	};

	const geometry = new THREE.ExtrudeGeometry(buttonShape, extrudeSettings);
	const mesh = new THREE.Mesh(geometry, bodyMaterial);
	mesh.rotateX(Math.PI / 2);
	mesh.position.y = 1.1;
	mesh.position.x = -1;

	return mesh;
};
