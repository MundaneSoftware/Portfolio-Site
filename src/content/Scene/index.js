import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Plane, ambientLight } from '@react-three/drei';

const Scene = () => {
  return (
    <Canvas
      style={{ height: '100vh', width: '100vw' }}
      camera={{ position: [0, 0, 5] }}
    >
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* 3D Objects */}
      <Sphere args={[1, 32, 32]} position={[0, 1, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Sphere>
      <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="lightgray" />
      </Plane>

      {/* Controls */}
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
