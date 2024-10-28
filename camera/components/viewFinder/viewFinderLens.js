import * as THREE from 'three';
import { env } from '../../texture/env.js';

const meterial = new THREE.MeshStandardMaterial( { color: '#3d3d3d', side: THREE.DoubleSide } );
const lens = new THREE.Object3D();
const shape = new THREE.Shape();

const radius = 0.0011;
const width = 0.5;
const height = 0.3;

shape.moveTo( 0, radius );
shape.quadraticCurveTo( 0, 0, radius, 0 );
shape.lineTo( width, 0 );
shape.quadraticCurveTo( width + radius, 0, width + radius, radius );
shape.lineTo( width + radius, height );
shape.quadraticCurveTo( width + radius, height + radius, width, height + radius );
shape.lineTo( radius, height + radius );
shape.quadraticCurveTo( 0, height + radius, 0, height );

const innerShape = new THREE.Shape();
const diff = 0.05;

innerShape.moveTo( 0 + diff, radius + diff );
innerShape.quadraticCurveTo( diff, diff, radius + diff, diff );
innerShape.lineTo( width - diff, diff );
innerShape.quadraticCurveTo( width + radius - diff, diff, width + radius - diff, radius + diff );
innerShape.lineTo( width + radius - diff, height - diff );
innerShape.quadraticCurveTo( width + radius - diff, height + radius - diff, width - diff, height + radius - diff );
innerShape.lineTo( radius, height + radius - diff );
innerShape.quadraticCurveTo( diff, height + radius - diff, diff, height - diff );


const lensCase = () => {

	const extrudeSettings = {
		steps: 7,
		depth: 0.05,
		bevelEnabled: false,
		bevelThickness: 0.01,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 5
	};

	const copiedShape = innerShape.clone();
	shape.holes.push( copiedShape );

	const geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	const mesh = new THREE.Mesh( geometry, meterial );

	lens.add( mesh );

};

const glass = () => {

	const envMap = env();

	const glassMeterial = new THREE.MeshPhysicalMaterial( { metalness: 0,
		color: 0x686666,
		metalness: 1,
		roughness: 0,
		envMap: envMap,
		envMapIntensity: 0.4,
		clearcoat: 1,
		clearcoatRoughness: 0,
		transmission: 1,
		opacity: 0.7,
		reflectivity: 0.3,
		thickness: 0.1,
		ior: 1.5,
	} );

	const extrudeSettings = {
		depth: 1,
		bevelEnabled: false,
	};


	const geometry = new THREE.ExtrudeGeometry( innerShape, extrudeSettings );
	const mesh = new THREE.Mesh( geometry, glassMeterial );

	mesh.position.z = 0.02;

	lens.add( mesh );

};

export const viewFinderLens = () => {

	lensCase();
	glass();

	lens.position.x = - 0.2;
	lens.position.y = 0.2;
	lens.position.z = - 0.55;


	return lens;

};
