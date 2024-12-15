import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const Room = () => {
    const floor = useGLTF('/scene/welcome_room/welcome_room_floor.glb');
    const floor_markings = useGLTF('/scene/welcome_room/welcome_room_floormarkings.glb');
    const stone_markings = useGLTF('/scene/welcome_room/welcome_room_stonemarkings.glb');
    const wall = useGLTF('/scene/welcome_room/welcome_room_wall.glb');

    // Load the texture for the floor
    const floorTexture = new TextureLoader().load('/scene/welcome_room/floor_texture.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; // Optional: Repeat wrapping
    floorTexture.repeat.set(8, 8); // Optional: Adjust the texture tiling

    return (
        <>
            <group>
                {floor.scene.children.map((child, index) => (
                    <mesh
                        key={index}
                        geometry={child.geometry}
                        rotation={child.rotation}
                        position={child.position}
                        scale={child.scale}
                    >
                        <meshStandardMaterial map={floorTexture} />
                    </mesh>
                ))}
            </group>
            <group
            >
                {/* Explicitly override material for all children */}
                {floor_markings.scene.children.map((child, index) => (
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
            <group
            >
                {/* Explicitly override material for all children */}
                {stone_markings.scene.children.map((child, index) => (
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
            <group
            >
                {/* Explicitly override material for all children */}
                {wall.scene.children.map((child, index) => (
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
        </>
    );
};

export default Room;
