import { useState, useEffect } from "react";
import Atropos from "atropos/react";
import "atropos/css";

const isBrowser = typeof window !== "undefined";

const AtroposComponent = () => {
  const [isMobile, setIsMobile] = useState(
    isBrowser ? window.innerWidth < 768 : false,
  );

  useEffect(() => {
    if (!isBrowser) return;

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <article
      className="size-64 sm:size-72 md:size-80 relative overflow-hidden backdrop-blur-md dark:bg-neutral-900/80 bg-neutral-400/80 rounded-full"
      data-atropos-offset="5"
    >
      {isMobile ? (
        <div className="size-full z-20 rounded-full">
          <img
            src="/images/header/avatar.webp"
            alt="avatar"
            className="backdrop-blur-md size-full relative -bottom-6 z-30 object-contain sombra"
          />
        </div>
      ) : (
        <Atropos
          className="size-full"
          rotateXMax={5}
          rotateYMax={5}
          shadow={true}
          shadowScale={3}
          activeOffset={30}
        >
          <div data-atropos-offset="15" className="size-full z-20 rounded-full">
            <img
              src="/images/header/avatar.webp"
              alt="avatar"
              className="backdrop-blur-md size-full relative -bottom-6 z-30 object-contain sombra"
            />
          </div>
        </Atropos>
      )}
    </article>
  );
};

export default AtroposComponent;
