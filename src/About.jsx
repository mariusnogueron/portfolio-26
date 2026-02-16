import {
  SiReact,
  SiVite,
  SiTailwindcss,
  SiWordpress,
  SiGreensock,
  SiThreedotjs,
  SiDocker,
  SiAdobepremierepro,
  SiAdobeaftereffects,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiBlender,
  SiFigma,
} from "react-icons/si";
import useSeo from "./useSeo";

const devSkills = [
  { name: "React", icon: SiReact },
  { name: "Vite", icon: SiVite },
  { name: "TailwindCSS", icon: SiTailwindcss },
  { name: "Wordpress", icon: SiWordpress },
  { name: "GSAP", icon: SiGreensock },
  { name: "Three.js", icon: SiThreedotjs },
  { name: "Docker", icon: SiDocker },
];

const creativeSkills = [
  "Motion Design",
  "UX / UI",
  "Photo",
  "3D",
  "Graphisme",
  "Captation Vidéo",
];

const creativeTools = [
  { name: "Premiere Pro", icon: SiAdobepremierepro },
  { name: "After Effects", icon: SiAdobeaftereffects },
  { name: "Photoshop", icon: SiAdobephotoshop },
  { name: "Illustrator", icon: SiAdobeillustrator },
  { name: "Blender", icon: SiBlender },
  { name: "Figma", icon: SiFigma },
];

function ObfuscatedEmail({ children, className }) {
  const handleClick = (e) => {
    e.preventDefault();
    const parts = ["marius", "nogueron", "gmail", "com"];
    window.location.href = `mailto:${parts[0]}.${parts[1]}@${parts[2]}.${parts[3]}`;
  };

  return (
    <a href="#contact" onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

function ObfuscatedInsta({ children, className }) {
  const handleClick = (e) => {
    e.preventDefault();
    const user = ["marius", "nog"].join(".");
    window.open(`https://www.instagram.com/${user}/`, "_blank");
  };

  return (
    <a href="#social" onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

const linkClass =
  "underline underline-offset-4 text-white before:content-[''] before:bg-white before:w-full hover:before:h-full before:h-0 before:transition-[height] ease-in-out duration-200 hover:text-black before:-z-10 before:absolute before:bottom-0 before:left-0 relative";

export default function About() {
  useSeo({
    title: "À propos | Marius Nogueron",
    description:
      "Créatif français de 21 ans basé à Grenoble. Développeur web créatif, motion designer et photographe.",
  });

  return (
    <>
      <div className="px-4 flex flex-col gap-8 md:gap-10 justify-center items-center text-center min-h-[calc(100svh-60px)] py-10 md:py-16 max-w-3xl mx-auto">
        <div className="flex flex-col gap-3">
          <h1 className="text-white text-xl md:text-5xl leading-tight">
            Créatif Français de 21 ans
          </h1>
          <span className="flex text-white justify-center gap-2 text-base md:text-xl">
            Actuellement
            <ObfuscatedEmail className="text-black w-fit px-2 flex items-center gap-3 bg-white rounded-2xl before:content-[''] before:block before:rounded-full before:w-3 before:h-3 before:bg-green-600 before:animate-pulse">
              Disponible
            </ObfuscatedEmail>
          </span>
          <p className="text-white/70 text-sm md:text-lg leading-relaxed">
            Basé à Grenoble, en France. Attiré par le numérique depuis
            l'enfance.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-white">
          <span className="text-base md:text-lg font-bold">Expériences</span>
          <span>BUT MMI</span>
          <span>
            Alternant Développeur Wordpress chez{" "}
            <a
              target="_blank"
              className={linkClass}
              href="https://labonneagence.com"
            >
              LBA
            </a>
          </span>
        </div>

        <div className="flex flex-col gap-6 text-white">
          <span className="text-base md:text-lg font-bold">Compétences</span>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/70">Développement Web Créatif</span>
              <div className="flex gap-2 flex-wrap justify-center">
                {devSkills.map((s) => (
                  <span
                    key={s.name}
                    className="flex items-center gap-1.5 text-black bg-white px-2 py-0.5 rounded-full"
                  >
                    <s.icon size={14} />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/70">Création Numérique</span>
              <div className="flex gap-2 flex-wrap justify-center">
                {creativeSkills.map((name) => (
                  <span
                    key={name}
                    className="flex text-black bg-white px-2 py-0.5 rounded-full"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/70">Outils</span>
              <div className="flex gap-2 flex-wrap justify-center">
                {creativeTools.map((s) => (
                  <span
                    key={s.name}
                    className="flex items-center gap-1.5 text-black bg-white px-2 py-0.5 rounded-full"
                  >
                    <s.icon size={14} />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex flex-col gap-3">
          <p className="text-white">
            Site{" "}
            <a
              href="https://photo.mariusnogueron.fr/"
              target="_blank"
              className={linkClass}
            >
              Photos
            </a>
            .
          </p>
          <p className="text-white">
            Pour toute demande de{" "}
            <span className="text-blue-700 bg-white"> contact</span>, vous
            pouvez me contacter par{" "}
            <ObfuscatedEmail className={linkClass}>Mail</ObfuscatedEmail> ou
            via{" "}
            <ObfuscatedInsta className={linkClass}>Instagram</ObfuscatedInsta>
          </p>
        </div>

        {/* Mobile buttons */}
        <div className="flex md:hidden flex-col gap-3 w-full">
          <a
            href="https://photo.mariusnogueron.fr/"
            target="_blank"
            className="bg-white text-blue-700 py-3 text-center text-sm"
          >
            Site Photos
          </a>
          <ObfuscatedEmail className="bg-white text-blue-700 py-3 text-center text-sm">
            Envoyer un mail
          </ObfuscatedEmail>
          <ObfuscatedInsta className="bg-white text-blue-700 py-3 text-center text-sm">
            Instagram
          </ObfuscatedInsta>
        </div>
      </div>
    </>
  );
}
