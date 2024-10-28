import * as THREE from 'three';

export function createBoxWithRoundedEdges( width, height, depth, radius0, smoothness ) {

	const shape = new THREE.Shape();
	const eps = 0.01;
	const radius = radius0 - eps;
	shape.absarc( eps, eps, eps, - Math.PI / 2, - Math.PI, true );
	shape.absarc( eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true );
	shape.absarc( width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true );
	shape.absarc( width - radius * 2, eps, eps, 0, - Math.PI / 2, true );
	const geometry = new THREE.ExtrudeBufferGeometry( shape, {
		depth: depth - radius0 * 2,
		bevelEnabled: true,
		bevelSegments: smoothness * 2,
		steps: 3,
		bevelSize: radius,
		bevelThickness: radius0,
		curveSegments: smoothness
	} );

	geometry.center();

	return geometry;

}
