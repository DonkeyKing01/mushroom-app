import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface MyceliumParticlesProps {
  count?: number;
  mousePosition: THREE.Vector2;
}

const MyceliumParticles = ({ count = 2000, mousePosition }: MyceliumParticlesProps) => {
  const points = useRef<THREE.Points>(null);
  const particlesRef = useRef<{
    positions: Float32Array;
    velocities: Float32Array;
    phases: Float32Array;
    originalPositions: Float32Array;
  }>();

  // Initialize particle system
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Aurora color palette (cyan, magenta, purple, gold)
    const auroraColors = [
      new THREE.Color(0x00ffc2), // cyan
      new THREE.Color(0xff2e93), // magenta
      new THREE.Color(0x5d3fd3), // purple
      new THREE.Color(0xffd700), // gold
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Create mycelium-like network structure
      const cluster = Math.floor(Math.random() * 5);
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 3 + cluster * 0.5;
      const height = (Math.random() - 0.5) * 4;

      const x = Math.cos(angle) * radius;
      const y = height;
      const z = Math.sin(angle) * radius;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      // Velocity for organic movement
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      phases[i] = Math.random() * Math.PI * 2;

      // Assign colors from aurora palette
      const color = auroraColors[Math.floor(Math.random() * auroraColors.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    particlesRef.current = {
      positions,
      velocities,
      phases,
      originalPositions,
    };

    return { positions, colors };
  }, [count]);

  // Animation loop
  useFrame((state) => {
    if (!points.current || !particlesRef.current) return;

    const { positions, velocities, phases, originalPositions } = particlesRef.current;
    const time = state.clock.getElapsedTime();
    const positionAttribute = points.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Curl noise-driven fluid dynamics
      const noiseX = Math.sin(time * 0.3 + phases[i]) * 0.5;
      const noiseY = Math.cos(time * 0.2 + phases[i] * 0.7) * 0.3;
      const noiseZ = Math.sin(time * 0.25 + phases[i] * 1.3) * 0.4;

      // Apply velocities with damping (inertia)
      positions[i3] += velocities[i3] + noiseX * 0.01;
      positions[i3 + 1] += velocities[i3 + 1] + noiseY * 0.01;
      positions[i3 + 2] += velocities[i3 + 2] + noiseZ * 0.01;

      // Mouse interaction - magnetic field distortion
      const particle = new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2]);
      const mouseInfluence = new THREE.Vector3(
        mousePosition.x * 5,
        mousePosition.y * 5,
        0
      );
      const distance = particle.distanceTo(mouseInfluence);
      
      if (distance < 2) {
        const force = (2 - distance) * 0.02;
        const direction = particle.clone().sub(mouseInfluence).normalize();
        velocities[i3] += direction.x * force;
        velocities[i3 + 1] += direction.y * force;
        velocities[i3 + 2] += direction.z * force;
      }

      // Damping to original position (elastic behavior)
      const returnForce = 0.002;
      velocities[i3] += (originalPositions[i3] - positions[i3]) * returnForce;
      velocities[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * returnForce;
      velocities[i3 + 2] += (originalPositions[i3 + 2] - positions[i3 + 2]) * returnForce;

      // Velocity damping
      velocities[i3] *= 0.98;
      velocities[i3 + 1] *= 0.98;
      velocities[i3 + 2] *= 0.98;

      positionAttribute.setXYZ(i, positions[i3], positions[i3 + 1], positions[i3 + 2]);
    }

    positionAttribute.needsUpdate = true;

    // Rotate entire particle system slowly
    points.current.rotation.y = time * 0.05;
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
      <bufferAttribute
        attach="geometry-attributes-color"
        args={[colors, 3]}
      />
    </Points>
  );
};

export default MyceliumParticles;
