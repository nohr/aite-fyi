import { Section } from "(ui)";

export function Project({
  title,
  description,
  github,
  url,
  program,
  ...props
}: ProjectProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Section id={title} {...props}>
      <h1 className="text-4xl font-bold">{title}</h1>
      <p>{description}</p>
      {url ? (
        <a href={url} target="_blank" rel="noreferrer">
          URL to project
        </a>
      ) : null}
      {github ? (
        <a href={github} target="_blank" rel="noreferrer">
          Github
        </a>
      ) : null}
      <Programs program={program} />
    </Section>
  );
}

function Programs({ program }: { program: string[] }) {
  return (
    <div className=" flex flex-row gap-x-1">
      {program.map((title: string) => (
        <p key={title}>{title}</p>
      ))}
    </div>
  );
}
