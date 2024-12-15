import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import WelcomeRoom from '../WelcomeRoom';
import * as THREE from 'three';

const BaseScene = () => {
  const [activeZone, setActiveZone] = useState('room');

  return (
    <Canvas
      shadows
      style={{ height: '100vh', width: '100vw' }}
      camera={{ position: [0, 10, 0], fov: 60 }}
      gl={{ antialias: true }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor('#000', 1); // Set clear color to black
        scene.fog = new THREE.Fog('#000000', 10, 50); // Optional: Add fog for depth
      }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 10, 0]} intensity={0.5} castShadow />

      {/* Active Zone Rendering */}
      {activeZone === 'room' && <WelcomeRoom />}

      {/* Postprocessing Effects */}
      <EffectComposer>
        <Bloom
          intensity={1.0} // Bloom intensity
          luminanceThreshold={0.3} // Threshold for bloom activation
          luminanceSmoothing={0.1} // Smoothing for the bloom
          height={300} // Resolution of bloom effect
        />
      </EffectComposer>

      {/* Camera Controls */}
      <OrbitControls
        enablePan={false} // Disable panning
        maxPolarAngle={Math.PI / 2.2} // Limit vertical rotation (look down)
        minPolarAngle={Math.PI / 6} // Limit vertical rotation (look up)
        minAzimuthAngle={-Math.PI / 0.5} // Limit horizontal rotation (left)
        maxAzimuthAngle={Math.PI / 2} // Limit horizontal rotation (right)
      />
    </Canvas>
  );
};

export default BaseScene;
