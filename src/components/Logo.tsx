interface LogoProps {
  light?: boolean;
  className?: string;
}

export default function Logo({ light = false, className = "" }: LogoProps) {
  return (
    <a
      href="#home"
      className={`inline-flex items-center gap-2.5 transition-opacity hover:opacity-90 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${className}`}
      aria-label="Ascend Lab - Home"
    >
      <img
        src="/logo.PNG"
        alt="Ascend Lab - Digital Marketing & Creative Agency"
        width={1030}
        height={642}
        className="h-10 sm:h-12 w-auto object-contain"
      />
    </a>
  );
}
