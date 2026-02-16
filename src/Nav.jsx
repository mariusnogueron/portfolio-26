import { NavLink } from "react-router";
import { Circle, Mail } from "lucide-react";
import { SiInstagram } from "react-icons/si";
import { useState, useEffect } from "react";

function ObfuscatedNavEmail({ children, className }) {
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

function ObfuscatedNavInsta({ children, className }) {
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

const menuItems = [
  { to: "/", label: "Home" },
  { to: "/realisations", label: "Réalisations" },
  { to: "/a-propos", label: "À propos" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex py-2 px-4 z-10 justify-between sticky top-0 mix-blend-difference">
        <div className="flex flex-col w-fit gap-0.5">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `${isActive ? "active-navLink" : ""} text-inactive text-sm hover:text-white h-fit select-none`
            }
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
            className={({ isActive }) =>
              `${isActive ? "active-navLink" : ""} group text-inactive overflow-hidden select-none text-sm hover:text-white hover:transition duration-75 ease-in-out flex items-center gap-1 relative pl-5`
            }
          >
            <div className="flex flex-col gap-2 text-white absolute bottom-0.5 group-hover:translate-y-[calc(50%+4px)] transform duration-200 ease-in-out left-0 motion-reduce:transition-none">
              <Circle size={16} />
              <Circle size={16} />
            </div>
            Travaux &#9786;
          </NavLink>
        </div>

        <div className="flex flex-col w-fit">
          <span className="text-sm select-none text-white">Contact</span>
          <div className="flex text-sm justify-between gap-0.5">
            <ObfuscatedNavInsta className="text-inactive hover:text-white select-none">
              IG
            </ObfuscatedNavInsta>
            <ObfuscatedNavEmail className="text-inactive hover:text-white select-none">
              @
            </ObfuscatedNavEmail>
          </div>
        </div>

        <div className="flex w-fit flex-col">
          <NavLink
            to={"/a-propos"}
            className={({ isActive }) =>
              `${isActive ? "active-navLink" : ""} text-inactive text-sm select-none self-end hover:text-white h-fit`
            }
          >
            À propos
          </NavLink>
          <span className="text-white">France (GMT+1)</span>
        </div>
      </nav>

      {/* Mobile nav */}
      <nav className="flex md:hidden py-3 px-4 z-50 justify-between items-center sticky top-0">
        <NavLink
          to={"/"}
          onClick={() => setOpen(false)}
          className="text-sm select-text bg-white cursor-text text-blue-700 px-2 py-1"
        >
          MN
        </NavLink>
        <button
          onClick={() => setOpen(!open)}
          className="text-white select-none flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile side menu */}
      <div
        className={`fixed top-14 right-0 z-40 flex flex-col items-end gap-3 p-4 md:hidden transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {menuItems.map((item, i) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `bg-white text-blue-700 px-4 py-2 text-sm select-none transition-all duration-300 ${open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} ${isActive ? "font-bold" : ""}`
            }
            style={{
              transitionDelay: open ? `${i * 80}ms` : "0ms",
            }}
          >
            {item.label}
          </NavLink>
        ))}
        <div
          className={`flex gap-3 transition-all duration-300 ${open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
          style={{
            transitionDelay: open ? `${menuItems.length * 80}ms` : "0ms",
          }}
        >
          <ObfuscatedNavInsta className="bg-white text-blue-700 p-2 select-none flex items-center">
            <SiInstagram size={18} />
          </ObfuscatedNavInsta>
          <ObfuscatedNavEmail className="bg-white text-blue-700 p-2 select-none flex items-center">
            <Mail size={18} />
          </ObfuscatedNavEmail>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
