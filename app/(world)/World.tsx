import { About, About2, Home, Page2, Page3, Work, Work2, Work3 } from ".";
export default function World() {
  return (
    <div className="world">
      <div className="flex h-screen w-max flex-row flex-nowrap ">
        <Page2 />
        <About />
        <Work />
      </div>
      <div className="flex h-screen w-max flex-row flex-nowrap ">
        <About2 />
        <Home />
        <Work2 />
      </div>
      <div className="flex h-screen w-max flex-row flex-nowrap ">
        <Page3 />
        <About2 />
        <Work3 />
      </div>
    </div>
  );
}
