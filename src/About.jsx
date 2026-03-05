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
  SiAdobelightroom,
  SiBlender,
  SiFigma,
} from "react-icons/si";
import useSeo from "./useSeo";

const creativeExpertises = [
  {
    name: "Motion Design",
    icon: SiAdobeaftereffects,
    description: "Animation et vidéo pour le web et au-delà",
  },
  {
    name: "UX / UI",
    icon: SiFigma,
    description: "Conception d'interfaces et expériences utilisateur",
  },
  {
    name: "Photographie",
    icon: SiAdobelightroom,
    description: "Captation et retouche photo professionnelle",
  },
];

const devExpertises = [
  {
    name: "React",
    icon: SiReact,
    description: "Framework principal au quotidien",
  },
  {
    name: "WordPress",
    icon: SiWordpress,
    description: "Environnement professionnel en alternance",
  },
  {
    name: "GSAP",
    icon: SiGreensock,
    description: "Animations complexes et performantes",
  },
  {
    name: "Three.js",
    icon: SiThreedotjs,
    description: "Expériences 3D sur le web",
  },
];

const otherDevSkills = [
  { name: "Vite", icon: SiVite },
  { name: "TailwindCSS", icon: SiTailwindcss },
  { name: "Docker", icon: SiDocker },
];

const otherCreativeSkills = ["3D", "Graphisme", "Captation Vidéo"];

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
      <div className="px-4 flex flex-col gap-10 md:gap-14 min-h-[calc(100svh-60px)] py-10 md:py-16 max-w-3xl mx-auto">
        <div className="flex flex-col gap-3">
          <h1 className="text-white text-2xl md:text-5xl leading-tight">
            Créatif Français de 21 ans
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-lg">
            Basé à Grenoble, en France. Attiré par le numérique depuis
            l'enfance.
          </p>
          <span className="flex text-white gap-2 text-sm md:text-base mt-1">
            Actuellement
            <ObfuscatedEmail className="text-black w-fit px-2 flex items-center gap-3 bg-white rounded-2xl before:content-[''] before:block before:rounded-full before:w-3 before:h-3 before:bg-green-600 before:animate-pulse">
              Disponible
            </ObfuscatedEmail>
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-white text-base md:text-lg font-bold">
            Création Numérique
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {creativeExpertises.map((s) => (
              <div
                key={s.name}
                className="flex flex-col gap-2 border border-white/20 p-4 hover:border-white/60 transition-colors duration-200"
              >
                <s.icon size={24} className="text-white" />
                <span className="text-white text-sm font-bold">{s.name}</span>
                <span className="text-white/50 text-xs leading-relaxed">
                  {s.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-white text-base md:text-lg font-bold">
            Développement Web
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {devExpertises.map((s) => (
              <div
                key={s.name}
                className="flex flex-col gap-2 border border-white/20 p-4 hover:border-white/60 transition-colors duration-200"
              >
                <s.icon size={24} className="text-white" />
                <span className="text-white text-sm font-bold">{s.name}</span>
                <span className="text-white/50 text-xs leading-relaxed">
                  {s.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-white text-base md:text-lg font-bold">
            Expériences
          </h2>
          <div className="flex flex-col gap-2 text-white text-sm md:text-base">
            <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
              <span>BUT MMI</span>
              <span className="text-white/50 text-xs">2023 - 2026</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
              <span>
                Alternant Développeur WordPress{" "}
                <a
                  target="_blank"
                  className={linkClass}
                  href="https://labonneagence.com"
                >
                  @LBA
                </a>
              </span>
              <span className="text-white/50 text-xs">2024 - 2026</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-white text-base md:text-lg font-bold">
            Compétences
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-white/50 text-xs uppercase tracking-wider">
                Création Numérique
              </span>
              <div className="flex gap-2 flex-wrap">
                {otherCreativeSkills.map((name) => (
                  <span
                    key={name}
                    className="flex text-black bg-white px-2 py-0.5 rounded-full text-sm"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-white/50 text-xs uppercase tracking-wider">
                Développement Web
              </span>
              <div className="flex gap-2 flex-wrap">
                {otherDevSkills.map((s) => (
                  <span
                    key={s.name}
                    className="flex items-center gap-1.5 text-black bg-white px-2 py-0.5 rounded-full text-sm"
                  >
                    <s.icon size={14} />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-white/50 text-xs uppercase tracking-wider">
                Outils
              </span>
              <div className="flex gap-2 flex-wrap">
                {creativeTools.map((s) => (
                  <span
                    key={s.name}
                    className="flex items-center gap-1.5 text-black bg-white px-2 py-0.5 rounded-full text-sm"
                  >
                    <s.icon size={14} />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col gap-3 text-white text-sm md:text-base">
          <p>
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
          <p>
            Pour toute demande de{" "}
            <span className="text-blue-700 bg-white px-1">contact</span>, vous
            pouvez me contacter par{" "}
            <ObfuscatedEmail className={linkClass}>Mail</ObfuscatedEmail> ou via{" "}
            <ObfuscatedInsta className={linkClass}>Instagram</ObfuscatedInsta>
          </p>
        </div>

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
