import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Torch = ({ url }) => {
    const torch = useGLTF(url);
    const lightRef = useRef();
    const flameRef = useRef();
    const smokeRef = useRef();

    // Flickering light effect
    useFrame(({ clock }) => {
        const elapsedTime = clock.elapsedTime;

        // Flicker intensity for light and flame scale
        const flicker = Math.sin(elapsedTime * 8) * 0.3 + 1.5;

        if (lightRef.current) {
            lightRef.current.intensity = flicker;
        }

        if (flameRef.current) {
            flameRef.current.scale.set(
                1 + flicker * 0.1,
                1 + flicker * 0.2,
                1 + flicker * 0.1
            );

            // Dynamic color variation for the flame
            const colorChange = Math.sin(elapsedTime * 5) * 0.5 + 0.5; // Range: 0 to 1
            flameRef.current.material.color.setHSL(0.1 + colorChange * 0.05, 1, 0.5); // Hue shift for flicker
        }

        if (smokeRef.current) {
            // Animate the smoke position and fading
            smokeRef.current.position.y += 0.01;
            smokeRef.current.material.opacity -= 0.001;
            if (smokeRef.current.material.opacity <= 0) {
                smokeRef.current.position.y = 0.125;
                smokeRef.current.material.opacity = 0.3;
            }
        }
    });

    // Extract model pivot position
    const [offsetX, offsetY, offsetZ] = [
        torch.scene.children[0].position.x,
        torch.scene.children[0].position.y,
        torch.scene.children[0].position.z,
    ];

    return (
        <group
            position={[offsetX, offsetY, offsetZ]}
        >

            {/* Explicitly override material for all children */}
            {torch.scene.children.map((child, index) => (
                <mesh
                    key={index}
                    geometry={child.geometry}
                    rotation={child.rotation}
                    scale={child.scale}
                    material={new THREE.MeshStandardMaterial({ color: 'gray' })}
                />
            ))}

            {/* Torch Flame */}
            <mesh ref={flameRef} position={[0.04, 0.125, 0]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial
                    color="orange"
                    emissive="orange" // Flame color
                    emissiveIntensity={1}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Light Emission */}
            <pointLight
                ref={lightRef}
                color="orange"
                position={[0.04, 0.125, 0]} // Match flame position
                intensity={0.5} // Base intensity
                distance={2.5} // Light radius
                castShadow
            />

            {/* Smoke Effect */}
            <mesh ref={smokeRef} position={[0.04, 0.125, 0]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial
                    color="gray"
                    transparent
                    opacity={0.3}
                />
            </mesh>
        </group>
    );
};

export default Torch;
