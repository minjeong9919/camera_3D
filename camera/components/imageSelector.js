import * as THREE from 'three';

export const imageSelector = () => {

	const extrudeSettings = {
		depth: 0.02,
		bevelEnabled: true,
		bevelThickness: 0.01,
		bevelSize: 0.01,
		bevelOffset: 0,
		bevelSegments: 10
	};

	const material = new THREE.MeshStandardMaterial( { color: '#ddd', side: THREE.DoubleSide } );
	const buttonMaterial = new THREE.MeshStandardMaterial( { color: '#3d3d3d', side: THREE.DoubleSide } );

	const buttonGroup = new THREE.Group();

	const containerShape = new THREE.Shape();
	containerShape.ellipse( 0, 0, 0.25, 0.25 );

	const containerGeometry = new THREE.ExtrudeGeometry( containerShape, extrudeSettings );
	const container = new THREE.Mesh( containerGeometry, material );
	container.position.x = - 1;
	container.position.y = - 0.3;
	container.position.z = - 0.53;
	buttonGroup.add( container );

	const arrowShape = new THREE.Shape();
	arrowShape.moveTo( 0, 0.07 );
	arrowShape.lineTo( - 0.07, 0.07 );
	arrowShape.lineTo( 0, 0 );
	arrowShape.lineTo( 0.07, 0.07 );
	arrowShape.lineTo( 0, 0.07 );

	const geometry = new THREE.ExtrudeGeometry( arrowShape, extrudeSettings );
	const up = new THREE.Mesh( geometry, buttonMaterial );
	up.position.y = - 0.1;
	up.position.x = - 1;
	up.position.z = - 0.56;
	up.rotateZ( Math.PI );

	const right = up.clone();
	right.position.x = - 1.2;
	right.position.y = - 0.3;
	right.rotateZ( Math.PI / 2 );

	const down = up.clone();
	down.position.y = - 0.5;
	down.position.x = - 1;
	down.rotateZ( Math.PI );

	const left = up.clone();
	left.position.x = - 0.8;
	left.position.y = - 0.3;
	left.rotateZ( Math.PI * 3 / 2 );


	const circleShape = new THREE.Shape();
	circleShape.ellipse( 0, 0, 0.05, 0.05 );

	const enterGeometry = new THREE.ExtrudeGeometry( circleShape, extrudeSettings );
	const enter = new THREE.Mesh( enterGeometry, buttonMaterial );
	enter.position.z = - 0.56;
	enter.position.y = - 0.3;
	enter.position.x = - 1;


	buttonGroup.add( up );
	buttonGroup.add( right );
	buttonGroup.add( down );
	buttonGroup.add( left );
	buttonGroup.add( enter );

	return buttonGroup;

};
