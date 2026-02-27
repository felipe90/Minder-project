import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  style = {},
  onClick,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const placeholderSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450" width="100%" height="100%">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1f3a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0a0e27;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="300" height="450" fill="url(#grad)"/>
      <g transform="translate(150, 225)">
        <!-- Film reel icon -->
        <circle cx="0" cy="0" r="50" fill="none" stroke="#FFB81C" stroke-width="3"/>
        <circle cx="0" cy="0" r="40" fill="none" stroke="#FFB81C" stroke-width="2"/>
        <circle cx="0" cy="0" r="30" fill="none" stroke="#FFB81C" stroke-width="2"/>
        
        <!-- Decorative spokes -->
        <line x1="0" y1="-50" x2="0" y2="-55" stroke="#FFB81C" stroke-width="2"/>
        <line x1="35" y1="-35" x2="39" y2="-39" stroke="#FFB81C" stroke-width="2"/>
        <line x1="50" y1="0" x2="55" y2="0" stroke="#FFB81C" stroke-width="2"/>
        <line x1="35" y1="35" x2="39" y2="39" stroke="#FFB81C" stroke-width="2"/>
        <line x1="0" y1="50" x2="0" y2="55" stroke="#FFB81C" stroke-width="2"/>
        <line x1="-35" y1="35" x2="-39" y2="39" stroke="#FFB81C" stroke-width="2"/>
        <line x1="-50" y1="0" x2="-55" y2="0" stroke="#FFB81C" stroke-width="2"/>
        <line x1="-35" y1="-35" x2="-39" y2="-39" stroke="#FFB81C" stroke-width="2"/>
      </g>
      <text x="150" y="400" text-anchor="middle" fill="#FFB81C" font-size="18" font-family="Arial">
        No Image
      </text>
    </svg>
  `;

  const placeholderDataUri = `data:image/svg+xml;base64,${btoa(placeholderSvg)}`;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#0a0e27',
        ...style,
      }}
    >
      {/* Placeholder shown while loading or on error */}
      {(isLoading || hasError) && (
        <img
          src={placeholderDataUri}
          alt="Placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
        />
      )}

      {/* Actual image */}
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoading || hasError ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
          ...style,
        }}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
      />
    </div>
  );
};
