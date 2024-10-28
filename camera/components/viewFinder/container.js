import * as THREE from 'three';
import { metal } from '../../texture/metal.js';
import { env } from '../../texture/env.js';

export const container = () => {

	const group = new THREE.Group();

	const metalMap = metal();
	const envmap = env();

	const shape = new THREE.Shape();
	const bodyMaterial = new THREE.MeshStandardMaterial( { color: 0xDCDADA, side: THREE.DoubleSide, metalness: 0.45, roughness: 0.3, flatShading: false, map: metalMap, envMap: envmap } );

	const height = 0.4;
	const backHeight = 0.2;
	const radius = 0.01;
	const frontDepth = 0.2;
	const backDepth = 0.8;

	shape.moveTo( 0, radius, );
	shape.lineTo( 0, height - radius );
	shape.quadraticCurveTo( 0, height, 0 + radius, height + radius );
	shape.lineTo( frontDepth, height + backHeight );
	shape.quadraticCurveTo( frontDepth, height + backHeight, frontDepth + radius, height + backHeight + radius );
	shape.quadraticCurveTo( frontDepth + radius, height + backHeight + radius, frontDepth + radius + 0.03, height + backHeight );
	shape.lineTo( frontDepth + backDepth, radius + 0.2 );
	shape.quadraticCurveTo( frontDepth + backDepth, radius + 0.2, frontDepth + backDepth + radius, 0.2 );
	shape.lineTo( frontDepth + backDepth, radius, radius );

	const extrudeSettings = {
	  steps: 7,
	  depth: 1.5,
	  bevelEnabled: true,
	  bevelThickness: 0.01,
	  bevelSize: 0.02,
	  bevelOffset: 0,
	  bevelSegments: 5
	};

	const viewFinderGeometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	const viewFinderMesh = new THREE.Mesh( viewFinderGeometry, bodyMaterial );
	viewFinderMesh.position.y = 0.4;
	viewFinderMesh.position.z = 0.5;
	viewFinderMesh.position.x = - 0.7;
	viewFinderMesh.rotateY( Math.PI / 2 );
	group.add( viewFinderMesh );


	return group;

};
