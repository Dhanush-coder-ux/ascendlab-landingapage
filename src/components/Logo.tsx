interface LogoProps {
  light?: boolean;
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <a
      href="#home"
      className={`group inline-flex items-center gap-2.5 transition-all duration-200 hover:opacity-95 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 ${className}`}
      aria-label="Ascend Lab - Home"
    >
      <img
        src="/logo.PNG"
        alt="Ascend Lab - Digital Marketing & Creative Agency"
        width={1030}
        height={642}
        className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
      />
    </a>
  );
}
