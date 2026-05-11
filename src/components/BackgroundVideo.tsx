"use client";

import { motion } from "framer-motion";

interface BackgroundVideoProps {
  videoMp4?: string;
  externalVideoUrl?: string;
  fallbackImage?: string;
  imageAlt?: string;
  opacity?: number;
}

export default function BackgroundVideo({ videoMp4, externalVideoUrl, fallbackImage, imageAlt, opacity = 40 }: BackgroundVideoProps) {
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    
    // Check if it's a direct video link (ends with .mp4 or contains progressive_redirect)
    const isDirectVideo = url.toLowerCase().includes(".mp4") || url.includes("progressive_redirect");
    if (isDirectVideo) return null;

    if (url.includes("vimeo.com")) {
      const id = url.split("/").pop()?.split("?")[0];
      return `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`;
    }
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let id = "";
      if (url.includes("v=")) {
        id = url.split("v=")[1].split("&")[0];
      } else {
        id = url.split("/").pop()?.split("?")[0] || "";
      }
      return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`;
    }
    return null;
  };

  const embedUrl = externalVideoUrl ? getEmbedUrl(externalVideoUrl) : null;
  
  // Use externalVideoUrl as direct source if it's not an embed
  const directVideoSrc = videoMp4 || (externalVideoUrl && !embedUrl ? externalVideoUrl : null);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {embedUrl ? (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <iframe
            src={embedUrl}
            className="absolute top-1/2 left-1/2 w-[115vw] h-[115vh] -translate-x-1/2 -translate-y-1/2"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            style={{ opacity: opacity / 100 }}
          />
        </div>
      ) : directVideoSrc ? (
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          key={directVideoSrc}
          className="w-full h-full object-cover scale-110"
          style={{ opacity: opacity / 100 }}
        >
          <source src={directVideoSrc} type="video/mp4" />
        </video>
      ) : fallbackImage ? (
        <img 
          src={fallbackImage} 
          alt={imageAlt || "Background"} 
          className="w-full h-full object-cover scale-110"
          style={{ opacity: opacity / 100 }}
        />
      ) : (
        <div className="w-full h-full bg-[#1c211e]" />
      )}
    </div>
  );
}
