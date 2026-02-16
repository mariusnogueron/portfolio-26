import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { GradientTexture, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import GUI from "lil-gui";
import { Text } from "@react-three/drei";
import { GradientType } from "@react-three/drei";

export default function SphereParticles() {
  const pointsRef = useRef();
  const { camera, size } = useThree();

  const isMobile = size.width < 768;

  const params = useRef({
    radius: 1,
    strength: 0.05,
  });

  useEffect(() => {
    if (isMobile) return;
    const gui = new GUI();
    gui.close();

    gui.title("Amusez-vous ✳️");

    gui.add(params.current, "radius", 0.5, 3, 0.1).name("Rayon influence");
    gui.add(params.current, "strength", 0.01, 0.2, 0.01).name("Force");

    return () => {
      gui.destroy();
    };
  }, [isMobile]);

  const mouse = useRef(new THREE.Vector2());
  const mouse3D = useRef(new THREE.Vector3());
  const raycaster = useRef(new THREE.Raycaster());

  const { geometry, originalPositions } = useMemo(() => {
    const segments = isMobile ? 32 : 64;
    const geo = new THREE.SphereGeometry(2, segments, segments);
    const originalPos = new Float32Array(geo.attributes.position.array);
    return { geometry: geo, originalPositions: originalPos };
  }, [isMobile]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / size.width) * 2 - 1;
      mouse.current.y = -(event.clientY / size.height) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size]);

  useFrame(() => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const count = pointsRef.current.geometry.attributes.position.count;

    raycaster.current.setFromCamera(mouse.current, camera);
    const ray = raycaster.current.ray;
    const oc = ray.origin.clone();
    const a = ray.direction.dot(ray.direction);
    const b = 2.0 * oc.dot(ray.direction);
    const c = oc.dot(oc) - 4;
    const discriminant = b * b - 4 * a * c;

    if (discriminant >= 0) {
      document.querySelector("body").style.cursor = "crosshair";
      const t = (-b - Math.sqrt(discriminant)) / (2.0 * a);
      mouse3D.current
        .copy(ray.origin)
        .add(ray.direction.clone().multiplyScalar(t));

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const dx = positions[i3] - mouse3D.current.x;
        const dy = positions[i3 + 1] - mouse3D.current.y;
        const dz = positions[i3 + 2] - mouse3D.current.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < params.current.radius) {
          const force =
            (1 - distance / params.current.radius) * params.current.strength;
          positions[i3] += (dx / distance) * force;
          positions[i3 + 1] += (dy / distance) * force;
          positions[i3 + 2] += (dz / distance) * force;
        } else {
          positions[i3] += (originalPositions[i3] - positions[i3]) * 0.05;
          positions[i3 + 1] +=
            (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.05;
          positions[i3 + 2] +=
            (originalPositions[i3 + 2] - positions[i3 + 2]) * 0.05;
        }
      }
    } else {
      document.querySelector("body").style.cursor = "default";

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] += (originalPositions[i3] - positions[i3]) * 0.05;
        positions[i3 + 1] +=
          (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.05;
        positions[i3 + 2] +=
          (originalPositions[i3 + 2] - positions[i3 + 2]) * 0.05;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <OrbitControls enableDamping enableZoom={false} dampingFactor={0.05} />
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial color={"blue"} size={0.02} />
      </points>
    </>
  );
}
