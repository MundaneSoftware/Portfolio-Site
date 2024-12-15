import React from 'react';
import { useGLTF } from '@react-three/drei';
import MagicCircle from './Components/MagicCircle';
import Torch from './Components/Torch';
import Room from './Components/Room';
import Barrel from './Components/Barrel';
import Portal from './Components/Portal';
import Doorway from './Components/Doorway';

const WelcomeRoom = () => {

  return (
    <group>
      <Room />
      <MagicCircle url="/scene/welcome_room/welcome_room_magiccircle1.glb"/>
      <MagicCircle url="/scene/welcome_room/welcome_room_magiccircle2.glb"/>
      <MagicCircle url="/scene/welcome_room/welcome_room_magiccircle3.glb"/>
      <MagicCircle url="/scene/welcome_room/welcome_room_magiccircle4.glb"/>
      <Torch url="/scene/welcome_room/welcome_room_torch1.glb"/>
      <Torch url="/scene/welcome_room/welcome_room_torch2.glb"/>
      <Torch url="/scene/welcome_room/welcome_room_torch3.glb"/>
      <Barrel />
      <Portal />
      <Doorway />
    </group>
  );
};

export default WelcomeRoom;
