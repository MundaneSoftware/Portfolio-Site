import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const MagicCircle = ({ url }) => {
    const circle = useGLTF(url);
    const meshRefs = useRef([]);

    // Random rotation parameters
    const axis = Math.random() > 0.5 ? 'x' : 'z'; // Random axis
    const speed = Math.random() * 0.01 + 0.01; // Random speed between 0.01 and 0.02

    // Animate rotation for each child mesh
    useFrame(() => {
        meshRefs.current.forEach((mesh) => {
            if (mesh) {
                mesh.rotation[axis] += speed;
            }
        });
    });

    return (
        <group>
            {/* Explicitly override material for all children */}
            {circle.scene.children.map((child, index) => (
                <mesh
                    key={index}
                    ref={(el) => (meshRefs.current[index] = el)}
                    geometry={child.geometry}
                    position={child.position}
                    rotation={child.rotation}
                    scale={child.scale}
                >
                    <pointLight
                        color="cyan"
                        position={[0, 0, 0]}
                        intensity={2}
                        castShadow
                    />
                    <meshStandardMaterial
                        color="cyan"
                        emissive="cyan" // Bright glowing effect
                        emissiveIntensity={0.5} // Intensity for bloom
                        transparent
                        opacity={1}
                    />
                </mesh>
            ))}
        </group>
    );
};

export default MagicCircle;
