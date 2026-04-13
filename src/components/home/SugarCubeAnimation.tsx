import React from 'react';

export const SugarCubeAnimation = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-50">
      <style dangerouslySetInnerHTML={{ __html: `
        .cube-wrapper {
          perspective: 1000px;
          width: 300px;
          height: 300px;
          position: relative;
        }

        .cube {
          width: 100%;
          height: 100%;
          position: absolute;
          transform-style: preserve-3d;
          animation: rotateCube 20s infinite linear;
        }

        .cube-face {
          position: absolute;
          width: 300px;
          height: 300px;
          border: 4px solid #84fb42;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 900;
          font-size: 40px;
          color: #84fb42;
          text-transform: uppercase;
          backface-visibility: visible;
          box-shadow: inset 0 0 30px rgba(132, 251, 66, 0.2);
        }

        .face-front  { transform: rotateY(0deg) translateZ(150px); }
        .face-back   { transform: rotateY(180deg) translateZ(150px); }
        .face-right  { transform: rotateY(90deg) translateZ(150px); }
        .face-left   { transform: rotateY(-90deg) translateZ(150px); }
        .face-top    { transform: rotateX(90deg) translateZ(150px); }
        .face-bottom { transform: rotateX(-90deg) translateZ(150px); }

        @keyframes rotateCube {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg); }
        }

        .ants-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 20;
        }

        .ant {
          position: absolute;
          width: 30px;
          height: 30px;
          fill: #84fb42;
          z-index: 30;
        }

        #ant1 { animation: ant-1-animation 12s infinite linear; }
        #ant2 { animation: ant-1-animation 12s infinite linear; animation-delay: 3s; }
        #ant3 { animation: ant-1-animation 12s infinite linear; animation-delay: 6s; }
        #ant4 { animation: ant-1-animation 12s infinite linear; animation-delay: 9s; }

        @keyframes ant-1-animation {
          0% { left: 50%; top: 110%; transform: rotate(0deg); }
          10% { left: 50%; top: 85%; transform: rotate(0deg); }
          15% { left: 50%; top: 85%; transform: rotate(-90deg); }
          25% { left: 15%; top: 85%; transform: rotate(-90deg); }
          30% { left: 15%; top: 85%; transform: rotate(-180deg); }
          40% { left: 15%; top: 15%; transform: rotate(-180deg); }
          45% { left: 15%; top: 15%; transform: rotate(-270deg); }
          55% { left: 85%; top: 15%; transform: rotate(-270deg); }
          60% { left: 85%; top: 15%; transform: rotate(-360deg); }
          70% { left: 85%; top: 85%; transform: rotate(-360deg); }
          75% { left: 85%; top: 85%; transform: rotate(-450deg); }
          85% { left: 50%; top: 85%; transform: rotate(-450deg); }
          90% { left: 50%; top: 85%; transform: rotate(-540deg); }
          100% { left: 50%; top: 110%; transform: rotate(-540deg); }
        }
      ` }} />
      
      <div className="cube-wrapper">
        <div className="cube">
          <div className="cube-face face-front">CINE</div>
          <div className="cube-face face-back">PLAY</div>
          <div className="cube-face face-right">FILM</div>
          <div className="cube-face face-left">REEL</div>
          <div className="cube-face face-top">STAR</div>
          <div className="cube-face face-bottom">ACT</div>
        </div>

        <div className="ants-container">
          {[1, 2, 3, 4].map((i) => (
            <svg key={i} id={`ant${i}`} className="ant" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.39 53.12">
              <path d="M539.22,398.8a20.17,20.17,0,0,0,3-10.91,14,14,0,0,1,6.22-12.12c.58-.41.56-1.79.6-2.74,0-.18-1-.44-1.53-.61a10.21,10.21,0,0,1-2.52-.74,3.21,3.21,0,0,0-3.17-.18,16.22,16.22,0,0,1-5,.34c-.4,0-.8-.54-1.2-.83l.17-.32c.3.09.6.16.89.27a4.36,4.36,0,0,0,4.08-.16c1.9-1.12,3.92-1.5,5.88.08a8.9,8.9,0,0,0,1.79.86c.43-2.45.07-4.19-1.94-5.61-1.13-.8-1.77-2.3-2.59-3.51a4.82,4.82,0,0,1-.58-1.2c-.89-2.69-3.22-3.93-5.38-5.33a8.47,8.47,0,0,1-.86-.64c-.09-.07-.11-.23-.32-.71.74.37,1.22.58,1.67.83,1.32.74,2.66,1.45,3.92,2.28a3.13,3.13,0,0,1,1,1.45,13.54,13.54,0,0,0,4.09,6l1.88-2.86c-2.65-.24-3.22-1.08-2.51-3.8.22-.86.56-1.68.91-2.71-1.3-.4-2.55-.85-3.83-1.17a3,3,0,0,1-2.21-1.94c-1-2.31-1.82-4.69-3.92-6.3-.13-.1-.11-.38.08-.83.42.31,1,.52,1.24.94,1,1.66,1.92,3.41,3,5.06a5.58,5.58,0,0,0,1.66,1.73,19.86,19.86,0,0,0,2.81,1.25c1,.44,2,.88,3.13.07a1.68,1.68,0,0,1,1.42-.13c1.29.57,2.27-.17,3.4-.52,2.45-.75,4.18-2,4.47-4.76a3.2,3.2,0,0,1,2.11-2.53,3.33,3.33,0,0,1-.26.82,9.36,9.36,0,0,0-2,5,1.67,1.67,0,0,1-1.59,1.65c-1.33.26-2.62.7-3.87,1a38.19,38.19,0,0,1,1.09,4c.36,2.31-.35,3.06-2.8,3l1.91,3a46.1,46.1,0,0,0,3-4.59c.74-1.48,1.2-2.93,3-3.58,1.38-.49,2.57-1.55,4.06-2.15a2.18,2.18,0,0,1-.39.65,8.37,8.37,0,0,1-1.66,1.13c-2.62,1.17-3.78,3.5-4.92,5.91a11.72,11.72,0,0,1-2.19,3.19c-2.42,2.44-2.18,2.73-2,5.77a7.21,7.21,0,0,0,1.52-.72c1.88-1.54,3.86-1.32,5.75-.2a4.4,4.4,0,0,0,4.45.1c.2-.09.41-.15.61-.22l.26.36c-.55.34-1.1,1-1.66,1-1.8,0-3.66.35-5.35-.72a2.33,2.33,0,0,0-1.56.07c-1.22.33-2.43.73-3.63,1.13a1.85,1.85,0,0,0-.86.47c-.28.35.41,3,.78,3.36.79.72,1.59,1.43,2.36,2.18,2.78,2.68,3.25,6.16,3.36,9.75a22.41,22.41,0,0,0,2.87,10.44,1.74,1.74,0,0,1-1.64-1.54c-.86-3.41-2.14-6.72-2.29-10.31-.14-3.25-.56-4.16-1.89-5.52a24.93,24.93,0,0,1-.17,4.45,12.52,12.52,0,0,1-1.68,4.17c-1.53,2.36-4.41,2.28-6-.05-1.85-2.67-2.05-5.66-1.53-8.76.06-.35.16-.69.25-1.07a6.81,6.81,0,0,0-2.94,5.69c-.17,3.81-1.31,7.38-2.26,11A2.54,2.54,0,0,1,539.22,398.8Z" transform="translate(-535.68 -345.68)" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};
