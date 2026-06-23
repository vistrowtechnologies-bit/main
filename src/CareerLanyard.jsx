import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Lanyard from './Lanyard.jsx';
import frontImage from './assets/lanyard/vistrow-front.svg';
import frontImageDark from './assets/lanyard/vistrow-front-dark.svg';
import backImage from './assets/lanyard/vistrow-back.svg';
import lanyardImage from './assets/lanyard/vistrow-band.svg';

function CareerLanyard() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light');
  const setDragging = (isDragging) => {
    document.querySelector('.careers-hero')?.classList.toggle('lanyard-dragging', isDragging);
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      observer.disconnect();
      setDragging(false);
    };
  }, []);

  return (
    <Lanyard
      position={[0, 0, 21]}
      gravity={[0, -40, 0]}
      frontImage={theme === 'dark' ? frontImageDark : frontImage}
      backImage={backImage}
      imageFit="cover"
      lanyardImage={lanyardImage}
      lanyardWidth={1.3}
      cardScale={2.25}
      onDragChange={setDragging}
    />
  );
}

export function mountCareerLanyard(rootElement) {
  if (!rootElement || rootElement.__vistrowLanyardRoot) return;
  const setDragging = (isDragging) => {
    rootElement.closest('.careers-hero')?.classList.toggle('lanyard-dragging', isDragging);
  };
  rootElement.addEventListener('pointerdown', () => setDragging(true));
  rootElement.addEventListener('pointerup', () => setDragging(false));
  rootElement.addEventListener('pointercancel', () => setDragging(false));
  rootElement.addEventListener('pointerleave', () => setDragging(false));
  rootElement.__vistrowLanyardRoot = createRoot(rootElement);
  rootElement.__vistrowLanyardRoot.render(<CareerLanyard />);
}
