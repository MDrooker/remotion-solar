import { ThreeCanvas } from '@remotion/three';
import React, { useEffect, useRef, useState } from 'react';
import { AbsoluteFill, useVideoConfig, Video } from 'remotion';
import Planet from './Planet';
import { SpaceDust } from './SpaceDust';
import { Sparks } from './Sparks';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })
const container: React.CSSProperties = {
	backgroundColor: 'white',
};

const videoStyle: React.CSSProperties = {
	position: 'absolute',
	opacity: 0,
};
const colors = {
	malevolentIllusion: [
		'#c06995',
		'#de77c7',
		'#df86df',
		'#d998ee',
		'#ceadf4',
		'#c6bff9',
	],
	sunnyRainbow: [
		'#fbe555',
		'#fb9224',
		'#f45905',
		'#be8abf',
		'#ffeed0',
		'#feff89',
	],
}
export const Scene: React.FC<{
	baseScale: number;
}> = ({ baseScale }) => {
	const { width, height } = useVideoConfig();


	return (
		<AbsoluteFill style={container}>
			<ThreeCanvas linear width={width} height={height} camera={{ fov: 40, position: [0, 0, 30] }}
				frameloop="never"
				onCreated={({ gl, size, camera }) => {
					gl.setClearColor(new THREE.Color('black'));
				}}>
				<ambientLight intensity={1.5} color="white" />
				<pointLight position={[10, 10, 0]} />
				{/* <Planet /> */}
				{/* <SpaceDust count={1000} /> */}
				<Sparks count={10} colors={colors.sunnyRainbow} />
			</ThreeCanvas>
		</AbsoluteFill>
	);
};
