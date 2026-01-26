import { NavLink } from "react-router";
import { Circle } from "lucide-react";
export default function Nav() {
  return (
    <>
      <nav className="py-2 px-4 z-10 flex justify-between">
        <div className="flex flex-col w-fit gap-0.5">
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) => {
              const state = isActive
                ? "active-navLink"
                : isPending
                ? "pendingnavLink"
                : "";
              return `${state} text-inactive text-sm hover:text-white h-fit select-none`;
            }}
          >
            Home
          </NavLink>
          <span className="text-sm select-text bg-white cursor-text text-blue-700">
            Marius Nogueron
          </span>
        </div>

        <div className="w-fit flex flex-col gap-0.5">
          <span className="text-sm select-none text-white">Réalisations</span>
          <NavLink
            to={"/realisations"}
            className={({ isActive, isPending }) => {
              const state = isActive
                ? "active-navLink"
                : isPending
                ? "pending-navLink"
                : "";
              return `${state} group text-inactive overflow-hidden select-none text-sm hover:text-white hover:transition duration-75 ease-in-out  flex items-center gap-1 relative pl-5`;
            }}
          >
            <div className="flex flex-col gap-2 text-white absolute bottom-0.5 group-hover:translate-y-[calc(50%+4px)] transform duration-200 ease-in-out left-0 motion-reduce:transition-none">
              <Circle className="" size={16} />
              <Circle className="" size={16} />
            </div>
            Travaux &#9786;
          </NavLink>
        </div>

        <div className="flex flex-col w-fit">
          <span className="text-sm select-none text-white">Contact</span>
          <div className="flex text-sm justify-between gap-0.5">
            <a
              href="https://www.instagram.com/marius.nog/"
              className="text-inactive hover:text-white select-none"
            >
              IG
            </a>
            <a
              href="mailto:votreadresse@mail.fr"
              target="_blank"
              rel="nofollow"
              className="text-inactive hover:text-white select-none"
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

              return `${state} text-inactive text-sm select-none hover:text-white h-fit`;
            }}
          >
            À propos
          </NavLink>
        </div>
      </nav>
    </>
  );
}
