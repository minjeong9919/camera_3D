import * as THREE from 'three';
import { container } from './container.js';
import { viewFinderLens } from './viewFinderLens.js';

const viewFinderObject = new THREE.Object3D();

export const viewFinder = () => {

	const Lens = viewFinderLens();
	const Container = container();

	viewFinderObject.add( Lens );
	viewFinderObject.add( Container );

	viewFinderObject.position.y = 0.6;

	return viewFinderObject;

};
