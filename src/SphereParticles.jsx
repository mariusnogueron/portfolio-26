import { Mesh } from "three";
import { OrbitControls } from "@react-three/drei";

export default function SphereParticles() {
  return (
    <>
      <OrbitControls />
      <mesh>
        <sphereGeometry scale={10} />
        <meshBasicMaterial color={"grey"} wireframe={true} />
      </mesh>
    </>
  );
}
