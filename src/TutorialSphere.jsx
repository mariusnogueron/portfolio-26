import useSeo from "./useSeo";
import { Link } from "react-router";

function CodeBlock({ code, title }) {
  return (
    <div className="flex flex-col gap-1">
      {title && (
        <span className="text-white/40 text-xs uppercase tracking-wider">
          {title}
        </span>
      )}
      <pre className="bg-white/5 border border-white/10 p-4 overflow-x-auto text-sm text-white/80 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function TutorialSphere() {
  useSeo({
    title: "Comment j'ai créé cette sphère 3D | Marius Nogueron",
    description:
      "Découvrez comment j'ai réalisé l'effet de sphère interactive en particules avec Three.js et React Three Fiber.",
  });

  return (
    <div className="px-4 flex flex-col gap-10 md:gap-14 py-10 md:py-16 max-w-3xl mx-auto text-white">
      <div className="flex flex-col gap-4">
        <Link
          to="/"
          className="text-white/50 text-sm hover:text-white transition-colors duration-200 w-fit"
        >
          &larr; Retour
        </Link>
        <h1 className="text-2xl md:text-5xl leading-tight">
          Comment j'ai créé cette sphère interactive
        </h1>
        <p className="text-white/50 text-sm">
          Three.js &middot; React Three Fiber &middot; GLSL-like logic
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-white/80 leading-relaxed">
          Sur la page d'accueil de ce portfolio, il y a une sphère composée de
          particules qui réagit à la souris. Quand on la survole, les points se
          repoussent, créant un effet de déformation organique. J'ai voulu un
          truc simple visuellement mais qui donne envie d'interagir.
        </p>
        <p className="text-white/80 leading-relaxed">
          Voici comment je l'ai fait, de A à Z.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg md:text-2xl font-bold">Le setup</h2>
        <p className="text-white/80 leading-relaxed">
          Le site est en React. Pour le 3D, j'utilise{" "}
          <strong className="text-white">React Three Fiber</strong> (R3F), qui
          est un renderer React pour Three.js. L'avantage c'est qu'on reste dans
          l'écosystème React : hooks, JSX, composants. Pas besoin de gérer les
          boucles de rendu manuellement.
        </p>
        <CodeBlock
          title="Dépendances"
          code={`npm install three @react-three/fiber @react-three/drei`}
        />
        <p className="text-white/80 leading-relaxed">
          Le composant{" "}
          <code className="text-white bg-white/10 px-1">Canvas</code> de R3F
          crée la scène. Je le pose en position absolue derrière tout le reste
          du contenu.
        </p>
        <CodeBlock
          title="Home.jsx"
          code={`<Canvas className="!absolute top-0 left-0 -z-10">
  <color attach="background" args={["black"]} />
  <SphereParticles />
</Canvas>`}
        />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg md:text-2xl font-bold">
          La géométrie de la sphère
        </h2>
        <p className="text-white/80 leading-relaxed">
          La base, c'est une{" "}
          <code className="text-white bg-white/10 px-1">SphereGeometry</code> de
          Three.js. Plutôt que de la rendre en mesh (surface pleine), je la
          rends en <strong className="text-white">points</strong>. Chaque sommet
          de la géométrie devient une particule.
        </p>
        <CodeBlock
          title="Génération de la géométrie"
          code={`const segments = isMobile ? 32 : 64;
const geo = new THREE.SphereGeometry(2, segments, segments);

// On sauvegarde les positions originales
// pour pouvoir y revenir après déformation
const originalPos = new Float32Array(
  geo.attributes.position.array
);`}
        />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg md:text-2xl font-bold">
          Le raycasting : détecter la souris en 3D
        </h2>
        <p className="text-white/80 leading-relaxed">
          Le cœur de l'interaction. La souris vit dans un espace 2D (l'écran),
          mais la sphère vit en 3D. Il faut donc projeter un rayon depuis la
          caméra à travers la scène pour trouver où la souris "touche" la
          sphère.
        </p>
        <CodeBlock
          title="Intersection rayon-sphère"
          code={`// Équation du rayon avec la sphère
raycaster.setFromCamera(mouse, camera);
const ray = raycaster.ray;
const oc = ray.origin.clone();
const a = ray.direction.dot(ray.direction);
const b = 2.0 * oc.dot(ray.direction);
const c = oc.dot(oc) - 4; // rayon² = 4
const discriminant = b * b - 4 * a * c;

if (discriminant >= 0) {
  // Le rayon touche la sphère
  const t = (-b - Math.sqrt(discriminant)) / (2.0 * a);
  mouse3D.copy(ray.origin)
    .add(ray.direction.clone().multiplyScalar(t));
}`}
        />
        <p className="text-white/80 leading-relaxed">
          Plutôt que d'utiliser le raycaster natif de Three.js (qui est optimisé
          pour les meshes), je fais le calcul d'intersection avec un équation.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg md:text-2xl font-bold">
          La déformation des particules
        </h2>
        <p className="text-white/80 leading-relaxed">
          Une fois qu'on sait où la souris touche la sphère en 3D, on peut
          repousser les particules proches. L'idée est simple : pour chaque
          point, on calcule sa distance par rapport au point de contact. Si il
          est dans le rayon d'influence, on le pousse vers l'extérieur.
        </p>
        <CodeBlock
          title="Boucle de déformation (dans useFrame)"
          code={`for (let i = 0; i < count; i++) {
  const i3 = i * 3;
  const dx = positions[i3] - mouse3D.x;
  const dy = positions[i3 + 1] - mouse3D.y;
  const dz = positions[i3 + 2] - mouse3D.z;
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

  if (distance < radius) {
    const force = (1 - distance / radius) * strength;
    positions[i3] += (dx / distance) * force;
    positions[i3 + 1] += (dy / distance) * force;
    positions[i3 + 2] += (dz / distance) * force;
  } else {
    positions[i3] += (original[i3] - positions[i3]) * 0.05;
    positions[i3 + 1] += (original[i3+1] - positions[i3+1]) * 0.05;
    positions[i3 + 2] += (original[i3+2] - positions[i3+2]) * 0.05;
  }
}`}
        />
        <p className="text-white/80 leading-relaxed">
          Le <code className="text-white bg-white/10 px-1">0.05</code> dans le
          retour élastique crée une interpolation linéaire. Les particules ne
          reviennent pas d'un coup à leur position, elles y glissent doucement.
          C'est ça qui donne l'effet satisfaisant.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg md:text-2xl font-bold">Les optimisations</h2>
        <p className="text-white/80 leading-relaxed">
          Quelques points clés pour que ça tourne bien :
        </p>
        <ul className="flex flex-col gap-2 text-white/80 text-sm leading-relaxed">
          <li className="flex gap-2">
            <span className="text-white/40 shrink-0">&mdash;</span>
            <span>
              <strong className="text-white">Segments adaptatifs</strong> 64 sur
              desktop. Moins de points = moins de calculs par frame.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-white/40 shrink-0">&mdash;</span>
            <span>
              <strong className="text-white">Pas de garbage collection</strong>{" "}
              : tout est pré-alloué dans des refs. Aucune allocation mémoire
              dans la boucle de rendu.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-white/40 shrink-0">&mdash;</span>
            <span>
              <strong className="text-white">Intersection analytique</strong> :
              un calcul mathématique plutôt qu'un raycaster traversant toute la
              géométrie.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-white/40 shrink-0">&mdash;</span>
            <span>
              <strong className="text-white">OrbitControls</strong> :
              enableDamping pour que la rotation soit fluide, enableZoom
              désactivé pour ne pas perdre la vue.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-white/40 shrink-0">&mdash;</span>
            <span>
              <strong className="text-white">GUI désactivé sur mobile</strong> :
              lil-gui est uniquement chargé sur desktop pour éviter les
              problèmes d'UI.
            </span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg md:text-2xl font-bold">Le rendu final</h2>
        <CodeBlock
          title="Le composant complet"
          code={`<points ref={pointsRef} geometry={geometry}>
  <pointsMaterial color={"blue"} size={0.02} />
</points>`}
        />
        <p className="text-white/80 leading-relaxed">
          Oui, c'est tout. Le matériau est un simple{" "}
          <code className="text-white bg-white/10 px-1">pointsMaterial</code>{" "}
          bleu avec une taille de 0.02.
        </p>
      </div>

      <div className="flex flex-col gap-4 border-t border-white/10 pt-10">
        <p className="text-white/80 leading-relaxed">
          Ce qui rend cette sphère intéressante, c'est pas sa complexité
          technique. C'est le fait qu'elle réagit. On a un retour physique de
          nos mouvements, et ça crée un lien entre l'utilisateur et la page.
          C'est tout le principe du développement web créatif.
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link
            to="/"
            className="text-white border border-white/20 px-4 py-2 text-sm hover:bg-white hover:text-blue-700 transition-colors duration-200"
          >
            Voir la sphère
          </Link>
          <a
            href="https://threejs.org/docs/"
            target="_blank"
            className="text-white/50 border border-white/10 px-4 py-2 text-sm hover:text-white hover:border-white/30 transition-colors duration-200"
          >
            Documentation Three.js
          </a>
          <a
            href="https://r3f.docs.pmnd.rs/"
            target="_blank"
            className="text-white/50 border border-white/10 px-4 py-2 text-sm hover:text-white hover:border-white/30 transition-colors duration-200"
          >
            Documentation R3F
          </a>
        </div>
      </div>
    </div>
  );
}
