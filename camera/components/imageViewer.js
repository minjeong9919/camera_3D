import * as THREE from 'three';
import { createBoxWithRoundedEdges } from '../shapes/createBoxWithRoundedEdge.js';

export const imageViewer = () => {

	const material = new THREE.MeshStandardMaterial( { color: '#ddd', side: THREE.DoubleSide } );
	const geometry = createBoxWithRoundedEdges( 1.8, 1.5, 0.05, 0.05, 1 );
	const mesh = new THREE.Mesh( geometry, material );
	mesh.position.y = 0;
	mesh.position.x = 0.3;
	mesh.position.z = - 0.5;

	return mesh;

};
