import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface SteamParticlesProps {
  count?: number;
}

const SteamParticles = ({ count = 500 }: SteamParticlesProps) => {
  const points = useRef<THREE.Points>(null);
  const particlesRef = useRef<{
    positions: Float32Array;
    velocities: Float32Array;
    ages: Float32Array;
    maxAge: Float32Array;
  }>();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const ages = new Float32Array(count);
    const maxAge = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    // Warm steam colors (white to light cyan/magenta)
    const steamColors = [
      new THREE.Color(0xffffff), // white
      new THREE.Color(0xe0f7fa), // light cyan
      new THREE.Color(0xfce4ec), // light pink
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Spawn particles from pot center
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.5;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = -2; // Start below
      positions[i3 + 2] = Math.sin(angle) * radius;

      // Upward velocity with turbulence
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = 0.02 + Math.random() * 0.03; // rise speed
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      ages[i] = Math.random() * 100;
      maxAge[i] = 50 + Math.random() * 50;

      // Color
      const color = steamColors[Math.floor(Math.random() * steamColors.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    particlesRef.current = { positions, velocities, ages, maxAge };
    return { positions, colors };
  }, [count]);

  useFrame(() => {
    if (!points.current || !particlesRef.current) return;

    const { positions, velocities, ages, maxAge } = particlesRef.current;
    const positionAttribute = points.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      ages[i]++;

      // Reset particle if too old
      if (ages[i] > maxAge[i]) {
        // Spawn particles from pot center (concentrated)
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 0.8; // Reduced from 1.5

        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = -1.2; // Start closer to center
        positions[i3 + 2] = Math.sin(angle) * radius;

        velocities[i3] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 1] = 0.02 + Math.random() * 0.03;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

        ages[i] = 0;
        maxAge[i] = 50 + Math.random() * 50;
      }

      // Apply turbulence
      const turbulence = Math.sin(ages[i] * 0.1) * 0.005;
      velocities[i3] += (Math.random() - 0.5) * turbulence;
      velocities[i3 + 2] += (Math.random() - 0.5) * turbulence;

      // Update position
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      positionAttribute.setXYZ(i, positions[i3], positions[i3 + 1], positions[i3 + 2]);
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
      <bufferAttribute
        attach="geometry-attributes-color"
        args={[colors, 3]}
      />
    </Points>
  );
};

export default SteamParticles;
