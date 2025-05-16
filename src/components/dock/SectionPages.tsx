import { Dock, DockIcon } from "@/components/magicui/dock";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faWhatsapp,
  faStackOverflow,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import {
  BookMarked,
  Contact,
  Grip,
  Headset,
  House,
  SunMoon,
  X,
} from "lucide-react";
import { useState } from "react";

const socialLinks = [
  {
    href: "https://wa.link/ziznd6",
    icon: faWhatsapp,
    label: "WhatsApp",
    color: "text-green-500",
  },
  {
    href: "https://github.com/fotrix",
    icon: faGithub,
    label: "GitHub",
    color: "text-gray-700 dark:text-gray-300",
  },
  {
    href: "https://www.linkedin.com/in/daniel-uribe-pulgar/",
    icon: faLinkedin,
    label: "LinkedIn",
    color: "text-blue-600",
  },
  {
    href: "https://stackoverflow.com/users/29030872/daniel",
    icon: faStackOverflow,
    label: "Stack Overflow",
    color: "text-orange-500 hover:text-orange-600",
  },
  {
    href: "https://discord.com/users/YOUR_DISCORD_ID",
    icon: faDiscord,
    label: "Discord",
    color: "text-indigo-500 hover:text-indigo-600",
  },
];

interface SocialDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}
const SocialDrawer: React.FC<SocialDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 p-2 bg-background/80 dark:bg-neutral-900/80 backdrop-blur-md border border-border dark:border-neutral-700 rounded-lg shadow-lg flex flex-col space-y-1.5 items-center z-20"
          style={{ minWidth: "55px" }}
        >
          {socialLinks.map((link) => {
            const { icon, href, label, color } = link;
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`block p-1.5 rounded-full hover:bg-muted/50 dark:hover:bg-neutral-700/50 transition-colors ${color}`}
              >
                <FontAwesomeIcon icon={icon} size="xl" />
              </a>
            );
          })}
          <a
            href="/project"
            rel="noopener noreferrer"
            aria-label="Ir a la sección de proyectos"
            className="block p-1.5 rounded-full hover:bg-muted/50 dark:hover:bg-neutral-700/50 transition-colors text-yellow-500"
          >
            <FontAwesomeIcon icon={faLightbulb} size="xl" />
          </a>
          {/* Separator */}
          <div className="w-full h-px bg-border dark:bg-neutral-700 my-1"></div>
          <button
            onClick={onClose}
            aria-label="Cerrar drawer social"
            className="p-1.5 rounded-full text-muted-foreground dark:text-neutral-400 hover:bg-muted/50 dark:hover:bg-neutral-700/50 hover:text-foreground dark:hover:text-neutral-300 transition-colors"
          >
            <X className="size-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const SectionPages = () => {
  const [isOpen, seTisOpen] = useState(false);

  const toggleDrawer = () => {
    seTisOpen(!isOpen);
  };

  return (
    <div className="relative z-20">
      <SocialDrawer isOpen={isOpen} onClose={toggleDrawer} />

      <Dock
        iconDistance={80}
        className="fixed bottom-4 right-0 left-0"
        iconMagnification={60}
      >
        <DockIcon
          magnification={0}
          distance={0}
          onClick={toggleDrawer}
          className="cursor-pointer"
        >
          <Grip className="text-gray-700 dark:text-gray-300" />
        </DockIcon>
        {/* Separator */}
        <div
          className="h-full w-px bg-border dark:bg-neutral-700 mx-2"
          aria-hidden="true"
        />

        <DockIcon>
          <a
            href="#header-section"
            className="block size-full"
            aria-label="Ir a la sección de inicio"
          >
            <House className="size-full text-red-600" />
          </a>
        </DockIcon>
        {/* sections */}

        <DockIcon>
          <a
            href="#about-section"
            className="block size-full"
            aria-label="Ir a la sección sobre mí"
          >
            <Contact className="size-full text-amber-700" />
          </a>
        </DockIcon>

        {/* <DockIcon>
          <a href="#about-section" className="block size-full" aria-label="Ir a la sección de cursos">
            <BookMarked className="size-full text-slate-700 dark:text-slate-300" />
          </a>
        </DockIcon> */}

        <DockIcon>
          <a
            href="#skill-section"
            className="block size-full"
            aria-label="Ir a la sección de cursos"
          >
            <BookMarked className="size-full text-slate-700 dark:text-slate-300" />
          </a>
        </DockIcon>

        <DockIcon>
          <a
            href="#contact-section"
            className="block size-full"
            aria-label="Ir a la sección de contacto"
          >
            <Headset className="size-full text-green-700" />
          </a>
        </DockIcon>

        <DockIcon>
          {/* para cambiar el tema */}
          <button
            type="button"
            aria-label="Cambiar modo oscuro"
            className="size-full flex items-center justify-center focus:outline-none"
            onClick={() => {
              if (typeof window !== "undefined") {
                const html = document.documentElement;
                html.classList.toggle("dark");
                // Opcional: guardar preferencia en localStorage
                if (html.classList.contains("dark")) {
                  localStorage.setItem("theme", "dark");
                } else {
                  localStorage.setItem("theme", "light");
                }
              }
            }}
          >
            <SunMoon className="size-full cursor-pointer" />
          </button>
        </DockIcon>
        {/* House */}
      </Dock>
    </div>
  );
};
