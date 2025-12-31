import React, { useEffect, useState } from "react";

export function VideoText({
  src,
  children,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  fontSize = 22,
  fontWeight = 900,
  fontFamily = "sans-serif",
}) {
  const [mask, setMask] = useState("");

  useEffect(() => {
    const text = String(children);

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="100%" height="100%" fill="black"/>
        <text
          x="50%"
          y="50%"
          text-anchor="middle"
          dominant-baseline="middle"
          font-size="${fontSize}vw"
          font-weight="${fontWeight}"
          font-family="${fontFamily}"
          fill="white"
        >
          ${text}
        </text>
      </svg>
    `;

    setMask(`url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
  }, [children, fontSize, fontWeight, fontFamily]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: mask,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "contain",
        }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
        >
          <source src={src} type="video/webm" />
        </video>
      </div>

      {/* SEO fallback */}
      <span className="sr-only">{children}</span>
    </div>
  );
}
