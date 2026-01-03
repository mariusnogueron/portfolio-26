import { NavLink } from "react-router";
import { Circle } from "lucide-react";
export default function Nav() {
  return (
    <>
      <nav className="py-2 px-4 z-10 flex justify-between">
        <div className="flex flex-col w-fit gap-0.5">
          <span className="text-sm">Marius Nogueron</span>
          <span className="text-sm text-inactive hover:text-white ">
            Creative Developper
          </span>
        </div>

        <div className="w-fit flex flex-col gap-0.5">
          <span className="text-sm">Réalisations</span>
          <NavLink
            to={"/realisations"}
            className={({ isActive, isPending }) => {
              const state = isActive
                ? "active-navLink"
                : isPending
                ? "pending-navLink"
                : "";
              return `${state} group text-inactive overflow-hidden text-sm hover:text-white hover:transition duration-75 ease-in-out  flex items-center gap-1 relative pl-5`;
            }}
          >
            <div className="flex flex-col gap-2 absolute bottom-0.5 group-hover:translate-y-[calc(50%+4px)] transform duration-200 ease-in-out left-0 motion-reduce:transition-none">
              <Circle className="" size={16} />
              <Circle className="" size={16} />
            </div>
            Travaux &#9786;
          </NavLink>
        </div>

        <div className="flex flex-col w-fit">
          <span className="text-sm">Contact</span>
          <div className="flex text-sm justify-between gap-0.5">
            <a
              href="https://www.instagram.com/marius.nog/"
              className="text-inactive hover:text-white"
            >
              IG
            </a>
            <a
              href="mailto:votreadresse@mail.fr"
              target="_blank"
              rel="nofollow"
              className="text-inactive hover:text-white"
            >
              @
            </a>
          </div>
        </div>

        <div className="flex w-fit">
          <NavLink
            to={"/a-propos"}
            className={({ isActive, isPending }) => {
              const state = isActive
                ? "active-navLink"
                : isPending
                ? "pending-navLink"
                : "";

              return `${state} text-inactive text-sm hover:text-white h-fit`;
            }}
          >
            À propos
          </NavLink>
        </div>
      </nav>
    </>
  );
}
