import * as THREE from 'three';

export function createCylinderWidthRoundedEdge( width, radius ) {

	const circleShape = new THREE.Shape();
	circleShape.moveTo( - width / 2, radius );
	circleShape.lineTo( width / 2, radius );
	circleShape.absarc( width / 2, 0, radius, Math.PI / 2, - Math.PI / 2, true );
	circleShape.lineTo( - width / 2, - radius );
	circleShape.absarc( - width / 2, 0, radius, - Math.PI / 2, Math.PI / 2, true );

	return circleShape;

}
