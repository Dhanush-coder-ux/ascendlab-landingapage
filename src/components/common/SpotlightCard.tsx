import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { gsap } from "../../animations/gsapConfig";
import { isReducedMotion } from "../../animations/animationPresets";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  onClick?: () => void;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(59, 130, 246, 0.18)",
  onClick,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isReducedMotion() || !cardRef.current) return;

    gsap.to(cardRef.current, {
      y: -6,
      borderColor: "rgba(59, 130, 246, 0.45)",
      boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(59, 130, 246, 0.15)",
      duration: 0.35,
      ease: "power2.out",
    });

    const icon = cardRef.current.querySelector(".card-interactive-icon");
    if (icon) {
      gsap.to(icon, {
        scale: 1.1,
        rotate: 4,
        duration: 0.35,
        ease: "power2.out",
      });
    }

    const arrow = cardRef.current.querySelector(".card-interactive-arrow");
    if (arrow) {
      gsap.to(arrow, {
        x: 4,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isReducedMotion() || !cardRef.current) return;

    gsap.to(cardRef.current, {
      y: 0,
      borderColor: "rgba(148, 163, 184, 0.15)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
      duration: 0.4,
      ease: "power2.out",
    });

    const icon = cardRef.current.querySelector(".card-interactive-icon");
    if (icon) {
      gsap.to(icon, {
        scale: 1,
        rotate: 0,
        duration: 0.35,
        ease: "power2.out",
      });
    }

    const arrow = cardRef.current.querySelector(".card-interactive-arrow");
    if (arrow) {
      gsap.to(arrow, {
        x: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border border-[rgba(148,163,184,0.15)] bg-[#111827] transition-colors duration-300 ${className}`}
      style={{
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 75%)`,
        }}
      />

      {/* Card Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

