import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Doorway = () => {
    const door = useGLTF('/scene/welcome_room/welcome_room_door.glb');
    const arch = useGLTF('/scene/welcome_room/welcome_room_arch.glb');
    const doorRef = useRef();
    const lightRef = useRef();
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const [offsetX, offsetY, offsetZ] = [
        arch.scene.children[0].position.x,
        arch.scene.children[0].position.y,
        arch.scene.children[0].position.z,
      ];

    // Animation for door rotation
    useFrame(() => {
        if (doorRef.current) {
            // Target rotation angle based on hover or click state
            const targetRotation = isClicked
                ? -Math.PI / 2 // Fully open on click
                : isHovered
                    ? -Math.PI / 12 // Slightly open on hover
                    : 0; // Closed by default

            if (doorRef.current.rotation.y === targetRotation)
                return;

            doorRef.current.rotation.y = THREE.MathUtils.lerp(
                doorRef.current.rotation.y,
                targetRotation,
                0.05 // Smooth interpolation speed
            );
        }
    });

    return (
        <group
            onPointerOver={() => setIsHovered(true)} // Trigger hover state
            onPointerOut={() => setIsHovered(false)} // Reset hover state
            onClick={() => setIsClicked((prev) => !prev)} // Toggle open/close on click
        >
            {/* Door Group */}
            <group>
                {door.scene.children.map((child, index) => (
                    <mesh
                        ref={doorRef}
                        key={index}
                        geometry={child.geometry}
                        rotation={child.rotation}
                        position={child.position}
                        scale={child.scale}
                        material={
                            new THREE.MeshStandardMaterial({
                                color: 'gray', // Highlight on hover
                            })
                        }
                    />
                ))}
            </group>

            {/* Arch Group */}
            <group>
                {arch.scene.children.map((child, index) => (
                    <mesh
                        key={index}
                        geometry={child.geometry}
                        rotation={child.rotation}
                        position={child.position}
                        scale={child.scale}
                        material={
                            new THREE.MeshStandardMaterial({
                                color: 'gray', // Highlight on hover
                            })
                        }
                    />
                ))}
            </group>

            {/* Light Behind Door */}
            <pointLight
                ref={lightRef}
                color="orange"
                intensity={isClicked || isHovered ? 2 : 0} // Initially off
                position={[offsetX-1.25, offsetY-2, offsetZ+.7]} // Positioned directly behind the door
                distance={5} // Light radius
                decay={2} // Light decay
                castShadow
            />
        </group>
    );
};

export default Doorway;
