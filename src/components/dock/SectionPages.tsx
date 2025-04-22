import { Dock, DockIcon } from "@/components/magicui/dock";
import { SocialDrawer } from "@/components/dock/SocialDrawer";
import { BookMarked, Contact, Headset, House, SunMoon } from "lucide-react";

export const SectionPages = () => {
  return (
    <div className="relative z-20">
      <Dock
        iconDistance={80}
        className="fixed bottom-4 right-0 left-0"
        iconMagnification={60}
      >
        
        <SocialDrawer />

        {/* Separator */}
        <div className="h-full w-px bg-border dark:bg-neutral-700 mx-2" aria-hidden="true" />

        <DockIcon>
          <a href="#header-section" className="block size-full" aria-label="Ir a la sección de inicio">
            <House className="size-full text-red-600" />
          </a>
        </DockIcon>
        {/* sections */}

        <DockIcon>
          <a href="#courses-section" className="block size-full" aria-label="Ir a la sección de cursos">
            <BookMarked className="size-full text-slate-700 dark:text-slate-300" />
          </a>
        </DockIcon>

        <DockIcon>
          <a href="#about-section" className="block size-full" aria-label="Ir a la sección sobre mí">
            <Contact className="size-full text-amber-700" />
          </a>
        </DockIcon>

        <DockIcon>
          <a href="#contact-section" className="block size-full" aria-label="Ir a la sección de contacto">
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
              if (typeof window !== 'undefined') {
                const html = document.documentElement;
                html.classList.toggle('dark');
                // Opcional: guardar preferencia en localStorage
                if (html.classList.contains('dark')) {
                  localStorage.setItem('theme', 'dark');
                } else {
                  localStorage.setItem('theme', 'light');
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
