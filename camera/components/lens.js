import * as THREE from 'three';

export const lens = () => {

	const bodyMaterial = new THREE.MeshStandardMaterial( { color: 'gray', side: THREE.DoubleSide } );

	const circleShape = new THREE.Shape();
	circleShape.absarc( 0, 0, 0.65 );

	const circleHole = new THREE.Shape();
	circleHole.absarc( 0, 0, 0.6 );

	circleShape.holes = [ circleHole ];

	const extrudeSettings = {
		depth: 0.7,
		bevelEnabled: true,
		steps: 13,
		bevelSize: 0.06,
		bevelThickness: 0.1,
		bevelSegments: 7
	};

	const geometry = new THREE.ExtrudeGeometry( circleShape, extrudeSettings );
	const mesh = new THREE.Mesh( geometry, bodyMaterial );
	mesh.position.z = 0.5;
	mesh.position.y = 0.03;

	return mesh;

};
