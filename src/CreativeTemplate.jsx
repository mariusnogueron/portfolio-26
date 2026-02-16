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
        stagger: 0.2,
      },
    );
  }, []);

  return (
    <>
      <div className="absolute left-4 bottom-4 flex flex-col">
        <div className="flex min-h-10 md:min-h-16 items-end">
          <span className="creativewords flex text-3xl/tight md:text-6xl/tight font-avant overflow-hidden text-transparent bg-radial bg-clip-text from-white to-blue-700 bg-animating-creative-template animate-bg-animation-home">
            Creative Developer
          </span>
        </div>
        <div className="flex min-h-10 md:min-h-16 items-end">
          <span className="creativewords flex text-3xl/tight md:text-6xl/tight font-avant overflow-hidden text-transparent bg-radial bg-clip-text from-white to-blue-700 bg-animating-creative-template animate-bg-animation-home">
            Direction Artistique
          </span>
        </div>
        <div className="flex min-h-10 md:min-h-16 items-end">
          <span className="creativewords flex text-3xl/tight md:text-6xl/tight font-avant overflow-hidden text-transparent bg-radial bg-clip-text from-white to-blue-700 bg-animating-creative-template animate-bg-animation-home">
            Motion Designer
          </span>
        </div>
        <div className="flex min-h-10 md:min-h-16 items-end">
          <span className="creativewords flex text-3xl/tight md:text-6xl/tight font-avant overflow-hidden text-transparent bg-radial bg-clip-text from-white to-blue-700 bg-animating-creative-template animate-bg-animation-home">
            Photographe
          </span>
        </div>
      </div>
    </>
  );
}
