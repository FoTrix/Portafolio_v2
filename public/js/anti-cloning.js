/**
 * Anti-Cloning Protection Script
 * Este script implementa múltiples técnicas para prevenir la clonación del sitio web
 */

// Función auto-ejecutable para evitar contaminación del ámbito global
(function () {
  // Verificar si el sitio está siendo cargado en un iframe
  function detectFraming() {
    try {
      // Si window.self y window.top no son iguales, estamos en un iframe
      if (window.self !== window.top) {
        // Redirigir a la página original
        window.top.location.href = window.self.location.href;
      }
    } catch (e) {
      // Si hay un error al acceder a window.top, probablemente estamos en un iframe con origen diferente
      // Redirigir a la página original
      document.body.innerHTML =
        "Este sitio no puede ser mostrado en un iframe.";
      setTimeout(function () {
        window.location.href = "about:blank";
      }, 1000);
    }
  }

  // Deshabilitar clic derecho para dificultar la inspección y copia
  function disableRightClick() {
    document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      return false;
    });
  }

  // Deshabilitar selección de texto para dificultar copiar-pegar
  function disableSelection() {
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    document.body.style.msUserSelect = "none";
    document.body.style.mozUserSelect = "none";
  }

  // Ofuscar el contenido del DOM para dificultar el scraping
  function obfuscateContent() {
    // Solo ofuscar contenido en producción, no en desarrollo
    if (
      window.location.hostname !== "localhost" &&
      !window.location.hostname.includes("127.0.0.1")
    ) {
      // Seleccionar elementos que contienen contenido importante
      const elementsToProtect = document.querySelectorAll(
        "p, h1, h2, h3, h4, h5, h6, span, div.content",
      );

      elementsToProtect.forEach((element) => {
        // Guardar el contenido original
        const originalContent = element.innerHTML;

        // No ofuscar si el elemento tiene muy poco contenido o es un elemento de navegación
        if (
          originalContent.length < 10 ||
          element.closest("nav") ||
          element.closest("header") ||
          element.closest("footer")
        ) {
          return;
        }

        // Ofuscar el contenido dividiendo el texto y añadiendo spans con data-attributes
        const words = originalContent.split(" ");
        let obfuscatedContent = "";

        words.forEach((word, index) => {
          // Crear un atributo de datos aleatorio
          const randomAttr =
            "data-" + Math.random().toString(36).substring(2, 8);
          obfuscatedContent += `<span ${randomAttr}="${index}">${word}</span> `;
        });

        // Reemplazar el contenido original con el ofuscado
        element.innerHTML = obfuscatedContent;
      });
    }
  }

  // Detectar herramientas de desarrollo
  function detectDevTools() {
    // Detectar apertura de DevTools por cambio de tamaño de ventana
    let devToolsOpen = false;
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;

    if (widthThreshold || heightThreshold) {
      devToolsOpen = true;
      console.clear();
      console.log(
        "%c¡Advertencia!",
        "color: red; font-size: 30px; font-weight: bold;",
      );
      console.log(
        "%cEste sitio está protegido contra clonación y scraping.",
        "font-size: 16px;",
      );
    }

    // Monitorear continuamente
    window.addEventListener("resize", function () {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold =
        window.outerHeight - window.innerHeight > threshold;

      if (widthThreshold || heightThreshold) {
        if (!devToolsOpen) {
          devToolsOpen = true;
          console.clear();
          console.log(
            "%c¡Advertencia!",
            "color: red; font-size: 30px; font-weight: bold;",
          );
          console.log(
            "%cEste sitio está protegido contra clonación y scraping.",
            "font-size: 16px;",
          );
        }
      } else {
        devToolsOpen = false;
      }
    });
  }

  // Añadir marca de agua invisible
  function addWatermark() {
    const watermark = document.createElement("div");
    watermark.style.position = "fixed";
    watermark.style.top = "0";
    watermark.style.left = "0";
    watermark.style.width = "100%";
    watermark.style.height = "100%";
    watermark.style.pointerEvents = "none";
    watermark.style.zIndex = "1000";
    watermark.style.opacity = "0.02";
    watermark.style.background = `url("data:text/plain;base64,${btoa(window.location.hostname)}") repeat`;
    document.body.appendChild(watermark);
  }

  // Detectar bots y scrapers por comportamiento
  function detectBots() {
    let mouseMovements = 0;
    let keyPresses = 0;
    let scrollEvents = 0;

    // Monitorear movimientos del ratón
    document.addEventListener("mousemove", function () {
      mouseMovements++;
    });

    // Monitorear pulsaciones de teclas
    document.addEventListener("keydown", function () {
      keyPresses++;
    });

    // Monitorear eventos de desplazamiento
    document.addEventListener("scroll", function () {
      scrollEvents++;
    });

    // Verificar comportamiento después de un tiempo
    setTimeout(function () {
      // Si no hay interacciones humanas típicas, podría ser un bot
      if (mouseMovements < 5 && keyPresses === 0 && scrollEvents < 2) {
        // Añadir elementos trampa que solo los bots verían
        const trapElements = document.createElement("div");
        trapElements.style.position = "absolute";
        trapElements.style.left = "-9999px";
        trapElements.style.top = "-9999px";
        trapElements.innerHTML =
          '<a href="/trap-link">Enlace invisible</a><p>Contenido trampa para bots</p>';
        document.body.appendChild(trapElements);
      }
    }, 10000); // Verificar después de 10 segundos
  }

  // Inicializar todas las protecciones
  function initProtection() {
    detectFraming();
    disableRightClick();
    disableSelection();
    setTimeout(obfuscateContent, 1000); // Retrasar para asegurar que el DOM esté cargado
    detectDevTools();
    addWatermark();
    detectBots();

    // Mensaje en consola para disuadir
    console.log(
      "%cAdvertencia de Seguridad",
      "color: red; font-size: 20px; font-weight: bold;",
    );
    console.log(
      "%cEste sitio web está protegido contra clonación y scraping.",
      "font-size: 14px;",
    );
    console.log(
      "%cCualquier intento de extraer contenido automáticamente viola nuestros términos de servicio.",
      "font-size: 14px;",
    );
  }

  // Ejecutar cuando el DOM esté completamente cargado
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProtection);
  } else {
    initProtection();
  }
})();
