import { useState, useEffect } from 'react';
import Atropos from "atropos/react"
import 'atropos/css'

// Helper function to check if running in a browser environment
const isBrowser = typeof window !== 'undefined';

const AtroposComponent = () => {
  // Initialize state based on current width if in browser, otherwise default to false
  const [isMobile, setIsMobile] = useState(isBrowser ? window.innerWidth < 768 : false); // Adjusted breakpoint back to 768px

  useEffect(() => {
    // Ensure this effect only runs in the browser
    if (!isBrowser) return;

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Adjusted breakpoint back to 768px
    };

    // Listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []); // Dependency array is empty, runs once on mount

  return (
    <article className="size-64 sm:size-72 md:size-80 relative overflow-hidden backdrop-blur-md dark:bg-neutral-900/80 bg-neutral-400/80 rounded-full" data-atropos-offset="5">
      {isMobile ? (
        // Render simple image on mobile
        <div className="size-full z-20 rounded-full">
          <img src="/avatar.png" alt="avatar" className="backdrop-blur-md size-full relative -bottom-6 z-30 object-contain sombra" />
        </div>
      ) : (
        // Render Atropos component on larger screens
        <Atropos 
          className="size-full"
          rotateXMax={5}
          rotateYMax={5} 
          shadow={true} 
          shadowScale={3} 
          activeOffset={30}
        >
            <div data-atropos-offset="15" className="size-full z-20 rounded-full">
                <img src="/avatar.png" alt="avatar"  className=" backdrop-blur-md size-full relative -bottom-6 z-30 object-contain sombra" />
            </div>
        </Atropos>
      )}
    </article>
  )
}

export default AtroposComponent;
