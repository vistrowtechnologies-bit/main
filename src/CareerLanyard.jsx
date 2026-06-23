import React from 'react';
import { createRoot } from 'react-dom/client';
import Lanyard from './Lanyard.jsx';
import frontImage from './assets/lanyard/vistrow-front.svg';
import backImage from './assets/lanyard/vistrow-back.svg';
import lanyardImage from './assets/lanyard/vistrow-band.svg';

function CareerLanyard() {
  return (
    <Lanyard
      position={[0, 0, 24]}
      gravity={[0, -40, 0]}
      frontImage={frontImage}
      backImage={backImage}
      imageFit="cover"
      lanyardImage={lanyardImage}
      lanyardWidth={1}
      cardScale={1.85}
    />
  );
}

export function mountCareerLanyard(rootElement) {
  if (!rootElement || rootElement.__vistrowLanyardRoot) return;
  rootElement.__vistrowLanyardRoot = createRoot(rootElement);
  rootElement.__vistrowLanyardRoot.render(<CareerLanyard />);
}
