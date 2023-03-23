"use client";

export function Section({ className = "", id, children, ...props }: any) {
  // const observer = useInView(`/${id}` as routes);
  // const zoom = useWorldStore((state) => state.zoom);
  // const rotate = useWorldStore((state) => state.rotate);

  // useEffect(() => {
  //   const observe = observer.current;
  //   const page = document.getElementById(id);
  //   if (page && observe && !zoom) {
  //     observe.observe(page);
  //   }
  // }, [observer, id, zoom]);
  return (
    <div
      {...props}
      id={id}
      className={
        className +
        "  flex h-[100dvh] w-screen flex-col items-center overflow-hidden p-4 py-0 md:h-full md:pb-0"
      }
    >
      {children}
    </div>
  );
}
