import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Lanyard from './Lanyard.jsx';
import frontImage from './assets/lanyard/vistrow-front.svg';
import frontImageDark from './assets/lanyard/vistrow-front-dark.svg';
import backImage from './assets/lanyard/vistrow-back.svg';
import lanyardImage from './assets/lanyard/vistrow-band.svg';

function CareerLanyard() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light');
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 680px)').matches);
  const setDragging = (isDragging) => {
    document.querySelector('.careers-hero')?.classList.toggle('lanyard-dragging', isDragging);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 680px)');
    const updateMobileState = () => setIsMobile(mediaQuery.matches);
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme);
    });

    updateMobileState();
    mediaQuery.addEventListener('change', updateMobileState);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      mediaQuery.removeEventListener('change', updateMobileState);
      observer.disconnect();
      setDragging(false);
    };
  }, []);

  return (
    <Lanyard
      position={isMobile ? [0, 0, 18.8] : [0, 0, 19]}
      gravity={[0, -40, 0]}
      frontImage={theme === 'dark' ? frontImageDark : frontImage}
      backImage={backImage}
      imageFit="cover"
      lanyardImage={lanyardImage}
      lanyardWidth={isMobile ? 0.54 : 1}
      cardScale={isMobile ? 2.08 : 2.25}
      segmentLength={isMobile ? 0.45 : 1}
      ribbonEndOffset={isMobile ? 0.28 : 0}
      onDragChange={setDragging}
    />
  );
}

export function mountCareerLanyard(rootElement) {
  if (!rootElement || rootElement.__vistrowLanyardRoot) return;
  rootElement.__vistrowLanyardRoot = createRoot(rootElement);
  rootElement.__vistrowLanyardRoot.render(<CareerLanyard />);
}
