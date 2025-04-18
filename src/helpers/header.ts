document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header-section");
    const parallaxContainer = document.getElementById("parallax-container");
    const elements = document.querySelectorAll(".parallax-element");
    const poster = document.getElementById("avatar");

    
    const width = poster?.clientWidth;
    
    // Avatar 3D effect on mouse move
    poster?.addEventListener("mousemove", (e) => {
      const { layerX, layerY } = e;
      
      const xRotation = ((layerY - width / 2) / width) * 10;
      const yRotation = ((layerX - width / 2) / width) * 10;
      
      poster.style.transform = `
      perspective(800px)
      scale(1.05)
      rotateX(${xRotation}deg)
      rotateY(${yRotation}deg)`;
    });

    poster?.addEventListener("mouseout", () => {
      poster.style.transform = `
      perspective(500px)
      scale(1)
      rotateX(0)
      rotateY(0)`
    });

          
      
    
   
    
  
    // Parallax effect for larger screens
    if (!elements.length || !parallaxContainer || window.innerWidth < 768) {
      return;
    }

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    function updateParallaxEffect(e: any) {
      const { clientX: mouseX, clientY: mouseY } = e;
      const centerX = windowWidth / 2;
      const centerY = windowHeight / 2;
      const percentX = (mouseX - centerX) / centerX;
      const percentY = (mouseY - centerY) / centerY;
      
      elements.forEach((element: Element) => {
        if (!(element instanceof HTMLElement)) return;
        
        const depth = parseFloat(element.getAttribute("data-depth") || "0.1");
        const moveX = percentX * depth * 100;
        const moveY = percentY * depth * 100;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    }

    function resetPositions() {
      elements.forEach((element: Element) => {
        if (!(element instanceof HTMLElement)) return;
        
        element.style.transition = "transform 0.5s ease-out";
        element.style.transform = "translate(0px, 0px)";

        setTimeout(() => {
          if (element instanceof HTMLElement) {
            element.style.transition = "transform 0.1s ease-out";
          }
        }, 500);
      });
    }

    function updateDimensions() {
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;

      if (windowWidth < 768) {
        parallaxContainer?.classList.add("hidden");
        parallaxContainer?.classList.remove("block");

        window.removeEventListener("mousemove", updateParallaxEffect);
        header?.removeEventListener("mouseleave", resetPositions);
      } else {
        parallaxContainer?.classList.remove("hidden");
        parallaxContainer?.classList.add("block");

        window.addEventListener("mousemove", updateParallaxEffect);
        header?.addEventListener("mouseleave", resetPositions);
      }
    }

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("mousemove", updateParallaxEffect);
      window.removeEventListener("resize", updateDimensions);
      header?.removeEventListener("mouseleave", resetPositions);
    };
  });