import * as THREE from 'three';
import { useEffect } from 'react';
import { useSprings, a } from '@react-spring/three';

const number = 35;
const colors = ['#CEFF00', '#1F91C7', '#527EC3', '#7A67B2', '#964E92', '#A23569'];
const random = (i) => {
  const r = Math.random();
  return {
    position: [100 - Math.random() * 200, 100 - Math.random() * 200, -i * 1.5],
    color: colors[Math.round(Math.random() * (colors.length - 1))],
    scale: [1 + r * 14, 1 + r * 14, 1],
    rotation: [0, 0, THREE.MathUtils.degToRad(Math.round(Math.random()) * 45)],
  };
};

const data = new Array(number).fill().map(() => {
  return {
    color: colors[Math.round(Math.random() * (colors.length - 1))],
    args: [0.1 + Math.random() * 9, 0.1 + Math.random() * 9, 10],
  };
});

export const SpringyBoxes = ({ transparent = false, wireframe = false, opacity = 1 }) => {
  const [springs, set] = useSprings(number, (i) => ({
    from: random(i),
    ...random(i),
    config: { mass: 20, tension: 150, friction: 50 },
  }));
  useEffect(() => void setInterval(() => set((i) => ({ ...random(i), delay: i * 40 })), 3000), []);
  return (
    <>
      <group>
        <pointLight intensity={0.3} />
        <ambientLight intensity={2} />
        <spotLight
          castShadow
          intensity={0.2}
          angle={Math.PI / 7}
          position={[150, 150, 250]}
          penumbra={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
      </group>
      {data.map((d, index) => (
        <a.mesh key={index} {...springs[index]} castShadow receiveShadow>
          <boxBufferGeometry attach="geometry" args={d.args} />
          <a.meshPhongMaterial
            attach="material"
            color={d.color}
            transparent={transparent}
            wireframe={wireframe}
            roughness={0.75}
            metalness={0.5}
            opacity={opacity}
          />
        </a.mesh>
      ))}
    </>
  );
};
