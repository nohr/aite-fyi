import { Section, Socials } from "(ui)";
import { Tools } from "./Tools";

export function Home({ ...props }) {
  // console.log(home);

  return (
    <Section
      {...props}
      id="home"
      className=" grid !h-[100dvh] select-none grid-cols-[75%_25%] items-center justify-center"
    >
      <div className="flex  flex-col items-start md:items-center">
        <Tools />
        <h1 className=" w-fit text-4xl font-bold md:text-6xl">Aite Eboigbe</h1>
        <h2 className="focused w-fit text-lg font-light md:text-3xl">
          Creative Software Developer
        </h2>
        <Socials />
      </div>
    </Section>
  );
}
