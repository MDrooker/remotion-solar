import { useRef } from 'react';
import { random } from 'remotion';
import { interpolate } from 'remotion';
import { useEffect, useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import React from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber'
const radiusVariance = () => interpolate(random('radiusVariance'), [0, 1], [.2, 1]);

export function Sparks({ count, colors, radius = 10 }) {
  const frame = useCurrentFrame();
  const { advance } = useThree();

  function SparkLine({ curve, width, color, speed, frame }) {
    const material = useRef();
    useEffect(() => {
      console.log(material.current.uniforms.dashOffset.value)
      material.current.uniforms.dashOffset.value -= speed;
      advance();
    }, [frame, speed]);

    return (
      <mesh>
        <meshLineGeometry attach="geometry" points={curve} />
        <meshLineMaterial
          ref={material}
          transparent
          depthTest={false}
          lineWidth={width}
          color={color}
          dashArray={0.1}
          dashRatio={0.95}
        />
      </mesh>
    );
  }

  const lines = useMemo(
    () =>
      new Array(count).fill().map((_, index) => {
        const pos = new THREE.Vector3(
          Math.sin(0) * radius * radiusVariance(),
          Math.cos(0) * radius * radiusVariance(),
          Math.sin(0) * Math.cos(0) * radius * radiusVariance()
        );
        const points = new Array(30).fill().map((_, index) => {
          const angle = (index / 20) * Math.PI * 2;
          return pos
            .add(
              new THREE.Vector3(
                Math.sin(angle) * radius * radiusVariance(),
                Math.cos(angle) * radius * radiusVariance(),
                Math.sin(angle) * Math.cos(angle) * radius * radiusVariance()
              )
            )
            .clone();
        });
        const curve = new THREE.CatmullRomCurve3(points).getPoints(100);
        const colorIndex = Math.floor(interpolate(random("color" + index), [0, 1], [0, 5])) + 1
        const color = colors[colorIndex]
        const speed = random("color" + index)
        return {
          color,
          width: Math.max(0.1, (0.2 * speed)),
          speed: Math.max(0.001, 0.004 * speed),
          curve,
        };
      }),
    [count, colors, radius]
  );

  return (
    <group position={[-radius * 2, -radius, -10]} scale={[1, 1.3, 1]}>
      {lines.map((props, index) => (
        <SparkLine key={index} {...props} frame={frame} />
      ))}
    </group>
  );
};
