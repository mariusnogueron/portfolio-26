import { useState, useEffect, useRef } from "react";
import WorksData from "./WorksData.json";
import { Link } from "react-router";
import gsap from "gsap";
import useSeo from "./useSeo";

export default function Works() {
  useSeo({
    title: "Réalisations | Marius Nogueron",
    description:
      "Découvrez les projets de Marius Nogueron : développement web créatif, direction artistique et motion design.",
  });

  const arrayWorks = WorksData.Works;
  const types = ["Tous", ...new Set(arrayWorks.map((el) => el.type))];

  const [activeFilter, setActiveFilter] = useState("Tous");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const filteredWorks =
    activeFilter === "Tous"
      ? arrayWorks
      : arrayWorks.filter((el) => el.type === activeFilter);

  const handleFilterChange = (type) => {
    setActiveFilter(type);
    setHoveredIndex(null);
  };

  const titleMobileRef = useRef(null);
  const titleDesktopRef = useRef(null);

  useEffect(() => {
    const targets = [titleMobileRef.current, titleDesktopRef.current].filter(
      Boolean,
    );
    if (targets.length) {
      gsap.fromTo(
        targets,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 },
      );
    }
  }, []);

  const filteredImages = filteredWorks.map((el) => el.img);

  const imgHeight = 300;
  const imgGap = 32;
  const step = imgHeight + imgGap;

  const activeIndex = hoveredIndex !== null ? hoveredIndex : 0;

  const filterBar = (
    <div className="flex gap-2 flex-wrap">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => handleFilterChange(type)}
          className={`px-3 py-1 text-sm border transition-colors duration-200 ${
            activeFilter === type
              ? "bg-white text-blue-700 border-white"
              : "text-white/60 border-white/20 hover:text-white hover:border-white/60"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className="flex md:hidden flex-col py-4 px-4 text-white gap-6">
        <h1 ref={titleMobileRef} className="text-2xl text-white opacity-0">
          Réalisations
        </h1>
        {filterBar}
        {filteredWorks.map((el, index) => {
          const id = String(index + 1).padStart(2, "0");
          return (
            <Link
              to={{ pathname: `/realisations/${el.slug}` }}
              key={el.slug}
              className="flex flex-col gap-2"
            >
              <img
                src={el.img}
                alt={el.name}
                className="w-full aspect-video object-contain"
              />
              <div className="flex justify-between items-baseline">
                <span className="text-white text-sm">{el.name}</span>
                <span className="text-inactive text-xs">{el.type}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="hidden md:flex flex-col py-2 text-white px-4 overflow-y-hidden min-h-[calc(100svh-60px)] justify-center">
        <h1
          ref={titleDesktopRef}
          className="text-6xl text-white mb-4 opacity-0"
        >
          Réalisations
        </h1>
        {filterBar}
        <div className="flex items-start mt-4 gap-6">
          <div className="flex-[3] flex flex-col">
            {filteredWorks.map((el, index) => {
              const id = String(index + 1).padStart(2, "0");
              return (
                <Link
                  to={{ pathname: `/realisations/${el.slug}` }}
                  className={`grid grid-cols-[minmax(80px,auto)_1fr_auto_auto] gap-4 work-item ${hoveredIndex === index ? "work-item--active" : ""}`}
                  key={el.slug}
                  onMouseEnter={() => setHoveredIndex(index)}
                >
                  <span>{el.type}</span>
                  <span>{el.name}</span>
                  <span className="text-right">{el.date}</span>
                  <span className="text-right w-8">{id}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex-[1] relative h-full flex items-center justify-center overflow-visible">
            <div
              className="absolute flex flex-col transition-transform duration-500 ease-out w-full"
              style={{
                gap: `${imgGap}px`,
                transform: `translateY(-${activeIndex * step}px)`,
                top: "50%",
                marginTop: `-${imgHeight / 2}px`,
              }}
            >
              {filteredImages.map((src, i) => (
                <img
                  key={filteredWorks[i].slug}
                  src={src}
                  alt={filteredWorks[i].name}
                  className="w-full shrink-0 transition-opacity duration-300"
                  style={{
                    height: `${imgHeight}px`,
                    objectFit: "cover",
                    opacity: i === activeIndex ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
