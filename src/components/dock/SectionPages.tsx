import { Dock, DockIcon } from "../magicui/dock";
import {
  House,
  Contact,
  Headset,
  BookMarked,
  AlignHorizontalSpaceAround,
  Grip,
  SunMoon,
} from "lucide-react";

export const SectionPages = () => {
  return (
    <div className="relative z-20">
      <Dock
        iconDistance={80}
        className="fixed bottom-4 right-0 left-0"
        iconMagnification={60}
      >
        <DockIcon magnification={60}>
          <Grip className=" text-gray-700" />
        </DockIcon>

        {/* House */}
        <DockIcon magnification={60}>
          <a href="#header-section" className="block size-full">
            <House className="size-full text-red-600" />
          </a>
        </DockIcon>

        {/* Separator */}
        <AlignHorizontalSpaceAround className="text-gray-700" />

        {/* sections */}

        <DockIcon>
          <a href="#courses-section" className="block size-full">
            <BookMarked className="size-full text-slate-700" />
          </a>
        </DockIcon>

        <DockIcon>
          <a href="#about-section" className="block size-full">
            <Contact className="size-full text-amber-700" />
          </a>
        </DockIcon>

        <DockIcon>
          <a href="#contact-section" className="block size-full">
            <Headset className="size-full text-green-700" />
          </a>
        </DockIcon>

        <DockIcon>
          <SunMoon className="size-full" />
        </DockIcon>
      </Dock>
    </div>
  );
};
