import { usePathname } from "next/navigation";
import { Panel } from "./Panel";

export function Modals() {
  const pathname = usePathname();
  console.log(pathname);
  const Bio = `I have been working as a freelance web developer for several years, during which time I have had the opportunity to work on a wide variety of projects for clients in diverse industries. While I have greatly enjoyed the flexibility and creative freedom that freelancing provides, I am now eager to pursue a full-time position that will allow me to collaborate with a team of talented developers and continue to learn and grow in my career.

However, my freelance work has been instrumental in helping me develop my skills and expertise as a web developer. Through my work with clients, I have gained experience in a range of programming languages and technologies, and have honed my ability to create effective, user-friendly websites that meet the unique needs and goals of each client. I have also learned valuable skills in project management, communication, and customer service, which I believe will be invaluable in any future role.

Ultimately, I see my freelance work as a testament to my passion for web development and my commitment to continuously improving my skills and knowledge. I am excited to bring this experience and enthusiasm to a full-time position, and am confident that I have the skills and expertise necessary to be a valuable asset to any team.`;
  return (
    <group>
      <Panel color="#ffffff00" position={[0, 0, 0]} rotation={[0, 0, 0]}>
        {Bio}
      </Panel>
    </group>
  );
}
