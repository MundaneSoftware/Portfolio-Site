import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Portal = () => {
    const portal = useGLTF('/scene/welcome_room/welcome_room_portal.glb');
    return (
        <group>
            {portal.scene.children.map((child, index) => (
                <mesh
                    key={index}
                    geometry={child.geometry}
                    rotation={child.rotation}
                    position={child.position}
                    scale={child.scale}
                    material={new THREE.MeshStandardMaterial({ color: 'gray' })}
                />
            ))}
        </group>
    );
};

export default Portal;
