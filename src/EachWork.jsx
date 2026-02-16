import { useParams } from "react-router";
import WorksData from "./WorksData.json";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Link } from "react-router";
import PixelCanvas from "./PixelCanvas";
import useSeo from "./useSeo";

function AnimatedNavLink({ to, text }) {
  const lettersRef = useRef([]);

  const onMouseEnter = () => {
    lettersRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        { y: 0 },
        {
          y: -20,
          duration: 0.4,
          ease: "power4.in",
          delay: i * 0.03,
          onComplete: () => {
            gsap.fromTo(
              el,
              { y: 20 },
              {
                y: 0,
                duration: 0.25,
                ease: "power4.out",
              },
            );
          },
        },
      );
    });
  };

  return (
    <Link
      to={{ pathname: to }}
      className="flex bg-white text-blue-700 p-2 overflow-hidden"
      onMouseEnter={onMouseEnter}
    >
      {text.split("").map((letter, i) => (
        <span
          key={i}
          ref={(el) => (lettersRef.current[i] = el)}
          className="inline-block"
          style={{ willChange: "transform" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </Link>
  );
}

export default function EachWork() {
  const { workId } = useParams();

  const vwork = WorksData.Works.find((work) => work.slug === workId);

  useSeo({
    title: `${vwork.name} | Marius Nogueron`,
    description: vwork.content || `Projet ${vwork.name} — ${vwork.type}`,
  });

  const id = vwork.id;
  const name = vwork.name;
  const slug = vwork.slug;
  const type = vwork.type;
  const img = vwork.img;
  const date = vwork.date;
  const content = vwork.content;
  const tags = vwork.tags;
  const category = vwork.category;
  const role = vwork.role;
  const medias = vwork.moremedias;
  const iframe = vwork.iframe;
  const firstimg = vwork.firstimg;

  const index = WorksData.Works.findIndex((work) => work.slug === workId);
  const lastIndexCheck = WorksData.Works.length - 1;
  const lastIndex = WorksData.Works[lastIndexCheck].slug;
  const firstIndex = WorksData.Works[0].slug;

  const isLastIndex = index === lastIndexCheck;
  const isFirstIndex = index === 0;

  const trackerRef = useRef(null);
  const trackedRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".projectName",
      { height: 0 },
      {
        height: "auto",
        duration: 0.25,
        ease: "power2.inOut",
        stagger: 0.04,
        delay: 0.1,
      },
    );

    const tracker = trackerRef.current;
    const tracked = trackedRef.current;
    if (!tracker || !tracked) return;

    gsap.set(tracked, { scale: 0, opacity: 0 });

    const onMouseMove = (e) => {
      gsap.to(tracked, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const onMouseEnter = () => {
      tracked.classList.add("insideImg");
      gsap.killTweensOf(tracked, "scale,opacity");
      gsap.to(tracked, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    };

    const onMouseLeave = () => {
      gsap.killTweensOf(tracked, "scale,opacity");
      gsap.to(tracked, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => tracked.classList.remove("insideImg"),
      });
    };

    const onClick = () => {
      gsap.fromTo(
        tracked,
        { scale: 1 },
        {
          scale: 2.5,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(tracked, { scale: 0, opacity: 0 });
            tracked.classList.remove("insideImg");
          },
        },
      );
    };

    tracker.addEventListener("mousemove", onMouseMove);
    tracker.addEventListener("mouseenter", onMouseEnter);
    tracker.addEventListener("mouseleave", onMouseLeave);
    tracker.addEventListener("click", onClick);

    return () => {
      tracker.removeEventListener("mousemove", onMouseMove);
      tracker.removeEventListener("mouseenter", onMouseEnter);
      tracker.removeEventListener("mouseleave", onMouseLeave);
      tracker.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <div className="u-container">
        <div ref={trackerRef} className={`h-80 md:h-160 trackerImg`}>
          <a target="_blank" href={iframe ? iframe : ""}>
            <PixelCanvas
              src={`../${firstimg}`}
              className={`object-contain h-full w-full`}
              alt={name}
            />
          </a>

          <div
            ref={trackedRef}
            className={`${iframe ? `trackedImg` : `hidden`}  fixed text-2xl bg-blue-700 px-2 rounded-full text-white pointer-events-none -translate-x-1/2 -translate-y-1/2`}
          >
            Voir 👀
          </div>
        </div>
        <div className="flex items-end flex-wrap h-auto md:h-16 mb-4">
          {name.split("").map((letter, index) => {
            return (
              <div className="flex" key={index}>
                <h1 className="projectName flex self-end overflow-hidden text-2xl/tight md:text-6xl/tight text-white">
                  {letter}
                </h1>
              </div>
            );
          })}
        </div>
        {role && (
          <div className="flex flex-wrap gap-2 md:gap-4 text-white my-4">
            <span>Rôle{role.length > 1 ? "s" : ""} :</span>
            {role.map((e, i) => {
              return (
                <strong
                  key={i}
                  className="flex text-black bg-white w-fit px-2 rounded-full"
                >
                  {e}
                </strong>
              );
            })}
          </div>
        )}

        {category && (
          <div className="flex flex-wrap gap-2 md:gap-4 text-white my-4">
            <span>Catégorie{category.length > 1 ? "s" : ""} :</span>
            {category.map((e, i) => {
              return (
                <strong
                  key={i}
                  className="flex text-black bg-white w-fit px-2 rounded-full"
                >
                  {e}
                </strong>
              );
            })}
          </div>
        )}

        <div className="u-grid text-white">{content}</div>
        {tags && (
          <div className="flex flex-wrap gap-2 md:gap-3 my-4">
            <span className="text-white">
              Technologie{tags.length > 1 ? "s" : ""} :
            </span>
            {tags.map((e, i) => {
              return (
                <strong
                  key={i}
                  className="flex text-black bg-white w-fit px-2 rounded-full"
                >
                  {e}
                </strong>
              );
            })}
          </div>
        )}

        {medias && (
          <div className="gap-4 text-white grid grid-cols-1 md:grid-cols-2">
            {medias.map((e, i) => {
              return (
                <PixelCanvas
                  key={i}
                  src={`../${e}`}
                  className="object-contain max-h-[800px] w-full"
                  alt={`${name} media ${i + 1}`}
                />
              );
            })}
          </div>
        )}

        <div className="text-white justify-between flex my-10">
          <AnimatedNavLink
            to={`/realisations/${isFirstIndex ? lastIndex : WorksData.Works[index - 1].slug}`}
            text="Précédent"
          />
          <AnimatedNavLink
            to={`/realisations/${isLastIndex ? firstIndex : WorksData.Works[index + 1].slug}`}
            text="Suivant"
          />
        </div>
      </div>
    </>
  );
}
