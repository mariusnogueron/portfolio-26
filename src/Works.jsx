import { useState } from "react";
import WorksData from "./WorksData.json";
import { Link } from "react-router";
import PixelCanvas from "./PixelCanvas";
import useSeo from "./useSeo";

export default function Works() {
  useSeo({
    title: "Réalisations | Marius Nogueron",
    description:
      "Découvrez les projets de Marius Nogueron : développement web créatif, direction artistique et motion design.",
  });

  const arrayWorks = WorksData.Works;
  const images = arrayWorks.map((el) => el.img);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const imgHeight = 220;
  const imgGap = 32;
  const step = imgHeight + imgGap;

  return (
    <>
      {/* Mobile layout */}
      <div className="flex md:hidden flex-col py-4 px-4 text-white gap-6">
        <h1 className="text-2xl text-blue-700 bg-white w-fit">Projets</h1>
        {arrayWorks.map((el, index) => {
          const id = String(index + 1).padStart(2, "0");
          return (
            <Link
              to={{ pathname: `/realisations/${el.slug}` }}
              key={id}
              className="flex flex-col gap-2"
            >
              <PixelCanvas
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

      {/* Desktop layout */}
      <div className="hidden md:flex flex-col py-2 text-white px-4 overflow-y-hidden min-h-[calc(100svh-60px)] justify-center">
        <h1 className="text-6xl text-blue-700 bg-white w-fit mb-4">Projets</h1>
        <div className="flex items-start">
          <div className="flex-1 flex flex-col">
            <div className="flex flex-col">
              {arrayWorks.map((el, index) => {
                const id = String(index + 1).padStart(2, "0");
                return (
                  <Link
                    to={{
                      pathname: `/realisations/${el.slug}`,
                    }}
                    className="flex work-item justify-between"
                    key={id}
                    onMouseEnter={() => setHoveredIndex(index)}
                  >
                    <span>{el.type}</span>
                    <span>{el.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex-2 relative h-full flex items-center justify-center overflow-visible">
            <div
              className="absolute flex flex-col transition-transform duration-500 ease-out w-full max-w-sm"
              style={{
                gap: `${imgGap}px`,
                transform: `translateY(-${hoveredIndex * step}px)`,
                top: "50%",
                marginTop: `-${imgHeight / 2}px`,
              }}
            >
              {images.map((src, i) => (
                <PixelCanvas
                  key={i}
                  src={src}
                  alt={arrayWorks[i].name}
                  className="w-full shrink-0 aspect-video transition-opacity duration-300"
                  style={{
                    height: `${imgHeight}px`,
                    objectFit: "cover",
                    opacity: i === hoveredIndex ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex flex-col">
              {arrayWorks.map((el, index) => {
                const id = String(index + 1).padStart(2, "0");
                return (
                  <Link
                    to={{
                      pathname: `/realisations/${el.slug}`,
                    }}
                    className="flex work-item justify-between"
                    key={id}
                    onMouseEnter={() => setHoveredIndex(index)}
                  >
                    <span>{el.date}</span>
                    <span>{id}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
