import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Barrel = () => {
    const barrel = useGLTF('/scene/welcome_room/welcome_room_barrel.glb');

    return (
        <group
        >

            {/* Explicitly override material for all children */}
            {barrel.scene.children.map((child, index) => (
                <mesh
                    key={index}
                    geometry={child.geometry}
                    position={child.position}
                    rotation={child.rotation}
                    scale={child.scale}
                    material={new THREE.MeshStandardMaterial({ color: 'gray' })}
                />
            ))}
        </group>
    );
};

export default Barrel;
