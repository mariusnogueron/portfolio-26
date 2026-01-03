import { MeshBasicMaterial, SphereGeometry } from "three";

import Nav from "./Nav.jsx";
import SphereParticles from "./SphereParticles.jsx";

import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <>
      <Nav />
      <Canvas className="!absolute top-0 left-0 -z-10">
        <color attach="background" args={["black"]} />

        <SphereParticles />
      </Canvas>
    </>
  );
}

!window.addEventListener("load", () => {
  console.log("load");
});
