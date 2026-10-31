import SectionHeading from "./common/SectionHeading";

interface HeadingProps {
  title: string;
  text?: string;
  id?: string;
  badge?: string;
  highlightWord?: string;
  align?: "center" | "left";
  className?: string;
}

export default function Heading({
  title,
  text,
  id,
  badge,
  highlightWord,
  align = "center",
  className = "",
}: HeadingProps) {
  return (
    <SectionHeading
      id={id}
      title={title}
      text={text}
      badge={badge}
      highlightWord={highlightWord}
      align={align}
      className={className}
    />
  );
}
