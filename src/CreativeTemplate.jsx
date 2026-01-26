import gsap from "gsap";
import { useEffect } from "react";

export default function CreativeTemplate() {
  useEffect(() => {
    let tl = gsap.timeline();

    tl.fromTo(
      ".creativewords",
      { height: 0 },
      {
        height: "auto",
        delay: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
      }
    );
  }, []);

  return (
    <>
      <div className="absolute left-4 bottom-4 flex flex-col ">
        <div className="flex min-h-12 items-end">
          <span className="creativewords flex text-5xl font-avant overflow-hidden text-transparent bg-clip-text bg-radial from-white from-10% to-gray-400">
            Creative Developper
          </span>
        </div>
        <div className="flex min-h-12 items-end">
          <span className="creativewords flex text-5xl font-avant overflow-hidden text-transparent bg-clip-text bg-radial from-white from-10% to-gray-400">
            Direction Artistique
          </span>
        </div>

        <div className="flex min-h-12 items-end">
          <span className="creativewords flex text-5xl font-avant overflow-hidden text-transparent bg-clip-text bg-radial from-white from-10% to-gray-400">
            Motion Designer
          </span>
        </div>
        <div className="flex min-h-12 items-end">
          <span className="creativewords flex text-5xl font-avant overflow-hidden text-transparent bg-clip-text bg-radial from-white from-10% to-gray-400">
            Photographe
          </span>
        </div>
      </div>
    </>
  );
}
