import { useEffect, useRef, useState } from 'react';

const ImgAbout = () => {
  const imgRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false); 

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = imgElement.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / (width / 2);
      const y = (e.clientY - top - height / 2) / (height / 2);

      const rotateY = x * 10;
      const rotateX = -y * 10;

      imgElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
      imgElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    if (isDesktop) {
      imgElement.addEventListener('mousemove', handleMouseMove);
      imgElement.addEventListener('mouseleave', handleMouseLeave);
    } else {
      imgElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }

    return () => {
      imgElement.removeEventListener('mousemove', handleMouseMove);
      imgElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDesktop]);

  return (
    <div style={{ perspective: '1000px' }}>
      <img 
        ref={imgRef}
        src="/images/about/About.webp"
        alt="Acerca de mí"
        className="w-full max-w-md h-auto rounded-lg shadow-lg transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      />
    </div>
  );
};

export default ImgAbout;