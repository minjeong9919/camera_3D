import * as THREE from 'three';

export const loadEnvMap = () => {

	const textureLoader = new THREE.CubeTextureLoader();
	return new Promise( ( resolve, reject ) => {

		const envMap = textureLoader.load(
			[
				'path_to_posx.jpg', 'path_to_negx.jpg',
				'path_to_posy.jpg', 'path_to_negy.jpg',
				'path_to_posz.jpg', 'path_to_negz.jpg',
			],
			() => {

				resolve( envMap );

			},
			undefined,
			( error ) => {

				reject( error );

			}
		);

	} );

};
