import { useEffect } from "react";
import gsap from "gsap";

export default function LoadAnimation() {
  useEffect(() => {
    gsap.to(".grid-stagger", {
      height: 0,
      duration: 1.5,
      stagger: { amount: 0.5 },
      ease: "power4.inOut",
    });
  }, []);
  return (
    <>
      <div className="flex absolute z-10">
        <div className="grid-stagger"></div>
        <div className="grid-stagger"></div>
        <div className="grid-stagger"></div>
        <div className="grid-stagger"></div>
        <div className="grid-stagger"></div>
        <div className="grid-stagger"></div>
        <div className="grid-stagger"></div>
        <div className="grid-stagger"></div>
        <div className="grid-stagger"></div>
      </div>
    </>
  );
}
