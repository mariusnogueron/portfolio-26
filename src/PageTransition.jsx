import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import gsap from "gsap";

export default function PageTransition() {
  const location = useLocation();
  const barsRef = useRef(null);

  useEffect(() => {
    const bars = barsRef.current?.children;
    if (!bars) return;

    gsap.set(bars, { height: "100svh" });
    gsap.to(bars, {
      height: 0,
      duration: 0.6,
      stagger: { amount: 0.25 },
      ease: "power3.inOut",
    });
  }, [location.pathname]);

  return (
    <div ref={barsRef} className="flex fixed inset-0 z-50 pointer-events-none">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="grid-stagger" />
      ))}
    </div>
  );
}
