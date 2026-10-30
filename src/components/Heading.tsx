import Reveal from "./Reveal";

interface HeadingProps {
  title: string;
  text?: string;
  id?: string;
}

export default function Heading({ title, text, id }: HeadingProps) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      <h2 id={id} className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 text-mute">{text}</p>}
    </Reveal>
  );
}

