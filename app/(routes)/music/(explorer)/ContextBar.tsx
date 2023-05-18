import Search from "./Search";

export default function ContextBar() {
  return (
    <div className="flex w-full flex-row items-center justify-between py-2">
      <div className=" flex flex-row ">
        <p>Download</p>
      </div>
      <Search />
    </div>
  );
}
