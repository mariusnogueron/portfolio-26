import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { NavLink } from "react-router";
import { Circle } from "lucide-react";

const roles = ["Creative Developer", "Motion Designer", "Photographe"];

export default function CreativeTemplate() {
  const containerRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const words = containerRef.current?.querySelectorAll(".creativeword");
    if (!words?.length) return;

    gsap.set(words, { yPercent: 110, willChange: "transform" });

    const tl = gsap.timeline();
    tl.to(words, {
      yPercent: 0,
      delay: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.12,
      onComplete: () => {
        gsap.set(words, { willChange: "auto" });
      },
    });

    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, delay: 2.5, duration: 0.6, ease: "power2.out" },
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 flex flex-col justify-center items-center px-4 pointer-events-none md:justify-end md:items-start md:px-0 md:absolute md:left-4 md:bottom-4"
      >
        <div className="md:hidden overflow-hidden mb-6">
          <span className="creativeword block text-sm select-text bg-white text-blue-700 px-2 py-1">
            Marius Nogueron
          </span>
        </div>

        {roles.map((role, i) => (
          <div
            key={i}
            className="flex min-h-10 md:min-h-16 items-end overflow-hidden"
          >
            <span className="creativeword block text-3xl/tight md:text-6xl/tight font-avant text-transparent bg-radial bg-clip-text from-white to-blue-700 bg-animating-creative-template animate-bg-animation-home">
              {role}
            </span>
          </div>
        ))}

        <div className="overflow-hidden mt-2">
          <NavLink
            to={"/realisations"}
            className={({ isActive }) =>
              `creativeword block pointer-events-auto ${isActive ? "active-navLink" : ""} text-white/60 text-xs md:text-2xl border border-white/20 px-3 py-1.5 hover:text-white hover:border-white/60 transition-colors duration-200`
            }
          >
            Réalisations &#9786;
          </NavLink>
        </div>

        <div className="md:hidden overflow-hidden mt-6">
          <span className="creativeword flex items-center gap-2 text-white text-sm">
            <span className="block rounded-full w-2.5 h-2.5 bg-green-600 animate-pulse" />
            Disponible
          </span>
        </div>
      </div>

      <Link
        ref={ctaRef}
        to="/tutoriel/sphere-threejs"
        className="hidden md:block absolute left-1/2 -translate-x-1/2 top-32 opacity-0 text-white/60 text-xs md:text-sm border border-white/20 px-3 py-1.5 hover:text-white hover:border-white/60 transition-colors duration-200"
      >
        Comment j'ai fait ça ?
      </Link>
    </>
  );
}
