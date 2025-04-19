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
      rotateY(0)`;
  });

  // Parallax effect for larger screens
  if (!elements.length || !parallaxContainer || window.innerWidth < 768) {
    return;
  }

  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  function updateParallaxEffect(e: MouseEvent) {
    if (!header) return;
    const rect = header.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Evitar división por cero si el header no tiene dimensiones
    const percentX = centerX === 0 ? 0 : (mouseX - centerX) / centerX;
    const percentY = centerY === 0 ? 0 : (mouseY - centerY) / centerY;

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
      // La transición ahora se maneja puramente por CSS en .parallax-element
      element.style.transform = "translate(0px, 0px)";
    });
  }

  function updateDimensions() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    if (windowWidth < 768) {
      parallaxContainer?.classList.add("hidden");
      parallaxContainer?.classList.remove("block");

      header?.removeEventListener("mousemove", updateParallaxEffect);
      header?.removeEventListener("mouseleave", resetPositions);
    } else {
      parallaxContainer?.classList.remove("hidden");
      parallaxContainer?.classList.add("block");

      header?.addEventListener("mousemove", updateParallaxEffect);
      header?.addEventListener("mouseleave", resetPositions);
    }
  }

  updateDimensions();

  window.addEventListener("resize", updateDimensions);

  return () => {
    header?.removeEventListener("mousemove", updateParallaxEffect);
    window.removeEventListener("resize", updateDimensions);
    header?.removeEventListener("mouseleave", resetPositions);
  };
});
