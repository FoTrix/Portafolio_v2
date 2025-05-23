/**
 * Content Protection Script - Protección avanzada contra scraping
 * Este script implementa técnicas de ofuscación de contenido para prevenir la clonación
 */

// Función auto-ejecutable para evitar contaminación del ámbito global
(function() {
  // Clave simple para cifrado/descifrado
  const key = generateKey();
  
  // Generar una clave basada en el dominio actual
  function generateKey() {
    const domain = window.location.hostname;
    let keyValue = 0;
    for (let i = 0; i < domain.length; i++) {
      keyValue += domain.charCodeAt(i);
    }
    return keyValue % 255;
  }
  
  // Cifrado simple XOR
  function xorEncrypt(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key);
    }
    return result;
  }
  
  // Convertir texto a formato base64
  function toBase64(text) {
    return btoa(text);
  }
  
  // Convertir base64 a texto
  function fromBase64(encoded) {
    return atob(encoded);
  }
  
  // Ofuscar contenido importante
  function protectContent() {
    // Seleccionar elementos con contenido importante
    const importantElements = document.querySelectorAll('.important-content, article p, .product-description, .main-content p');
    
    importantElements.forEach(element => {
      // Guardar el contenido original
      const originalContent = element.textContent;
      
      // No procesar elementos vacíos o muy cortos
      if (!originalContent || originalContent.trim().length < 20) {
        return;
      }
      
      // Cifrar el contenido
      const encrypted = xorEncrypt(originalContent, key);
      const encoded = toBase64(encrypted);
      
      // Crear un atributo de datos para almacenar el contenido cifrado
      element.setAttribute('data-protected', encoded);
      
      // Reemplazar el contenido con una versión ofuscada que se descifrará con JavaScript
      element.textContent = '';
      
      // Crear un elemento span para contener el contenido descifrado
      const contentSpan = document.createElement('span');
      contentSpan.className = 'protected-content';
      element.appendChild(contentSpan);
      
      // Descifrar y mostrar el contenido para usuarios legítimos
      setTimeout(() => {
        const encoded = element.getAttribute('data-protected');
        if (encoded) {
          const encrypted = fromBase64(encoded);
          const decrypted = xorEncrypt(encrypted, key);
          contentSpan.textContent = decrypted;
        }
      }, 100);
    });
  }
  
  // Proteger imágenes contra hotlinking y descarga
  function protectImages() {
    const images = document.querySelectorAll('img:not(.unprotected)');
    
    images.forEach(img => {
      // Prevenir arrastrar y soltar
      img.addEventListener('dragstart', function(e) {
        e.preventDefault();
      });
      
      // Añadir capa transparente sobre la imagen
      const parent = img.parentNode;
      const wrapper = document.createElement('div');
      wrapper.style.position = 'relative';
      wrapper.style.display = 'inline-block';
      
      parent.insertBefore(wrapper, img);
      wrapper.appendChild(img);
      
      const overlay = document.createElement('div');
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'transparent';
      overlay.style.cursor = 'default';
      
      wrapper.appendChild(overlay);
    });
  }
  
  // Añadir marca de agua dinámica
  function addDynamicWatermark() {
    // Crear un canvas para la marca de agua
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Configurar el tamaño del canvas
    canvas.width = 200;
    canvas.height = 100;
    
    // Dibujar texto en el canvas
    ctx.font = '12px Arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.rotate(-0.3);
    
    // Usar información del usuario para la marca de agua
    const userInfo = navigator.userAgent + ' - ' + new Date().toISOString().split('T')[0];
    const watermarkText = window.location.hostname + ' - ' + userInfo;
    
    // Repetir el texto varias veces
    for (let i = -100; i < canvas.width + 100; i += 70) {
      for (let j = -100; j < canvas.height + 100; j += 70) {
        ctx.fillText(watermarkText, i, j);
      }
    }
    
    // Convertir el canvas a una imagen de fondo
    const watermarkUrl = canvas.toDataURL('image/png');
    
    // Crear un elemento de marca de agua
    const watermark = document.createElement('div');
    watermark.style.position = 'fixed';
    watermark.style.top = '0';
    watermark.style.left = '0';
    watermark.style.width = '100%';
    watermark.style.height = '100%';
    watermark.style.backgroundImage = `url(${watermarkUrl})`;
    watermark.style.pointerEvents = 'none';
    watermark.style.zIndex = '1000';
    watermark.style.opacity = '0.7';
    
    document.body.appendChild(watermark);
  }
  
  // Detectar y bloquear herramientas de scraping
  function detectScrapingTools() {
    // Lista de propiedades que suelen usar las herramientas de scraping
    const scrapingProps = [
      'phantom',
      'callPhantom',
      '__nightmare',
      'nightmare',
      '_selenium',
      'selenium',
      'webdriver',
      '_Selenium_IDE_Recorder',
      '_phantom',
      '__selenium_unwrapped',
      '__webdriver_script_fn',
      '__driver_evaluate',
      '__webdriver_evaluate',
      '__selenium_evaluate',
      '__fxdriver_evaluate',
      '__driver_unwrapped',
      '__webdriver_unwrapped',
      '__selenium_unwrapped',
      '__fxdriver_unwrapped',
      '__webdriver_script_func',
      '$cdc_asdjflasutopfhvcZLmcfl_'
    ];
    
    // Verificar si alguna de estas propiedades existe en window
    for (const prop of scrapingProps) {
      if (prop in window) {
        // Detectado herramienta de scraping
        disruptScraping();
        break;
      }
    }
    
    // Verificar navigator.webdriver
    if (navigator.webdriver === true) {
      disruptScraping();
    }
  }
  
  // Interrumpir el scraping cuando se detecta
  function disruptScraping() {
    // Insertar contenido falso para confundir a los scrapers
    const fakeContent = document.createElement('div');
    fakeContent.style.display = 'none';
    fakeContent.innerHTML = `
      <div class="product-info">
        <h2>Producto Premium</h2>
        <p>Precio: $99.99</p>
        <p>Descuento especial: 50% OFF</p>
      </div>
      <div class="contact-info">
        <p>Email: info@ejemplo.com</p>
        <p>Teléfono: 123-456-7890</p>
      </div>
    `;
    document.body.appendChild(fakeContent);
    
    // Modificar aleatoriamente el DOM para romper los selectores
    const elements = document.querySelectorAll('div, p, span, h1, h2, h3');
    elements.forEach(el => {
      // Añadir atributos aleatorios
      el.setAttribute('data-' + Math.random().toString(36).substring(2, 8), 'true');
    });
  }
  
  // Inicializar protecciones cuando el DOM esté listo
  function init() {
    // Aplicar protecciones solo en producción
    if (window.location.hostname !== 'localhost' && !window.location.hostname.includes('127.0.0.1')) {
      setTimeout(protectContent, 500);
      setTimeout(protectImages, 700);
      setTimeout(addDynamicWatermark, 1000);
      detectScrapingTools();
      
      // Verificar periódicamente herramientas de scraping
      setInterval(detectScrapingTools, 5000);
    }
  }
  
  // Ejecutar cuando el DOM esté completamente cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();