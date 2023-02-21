import useInView from "./useInView";

export function Section(props?: any) {
  const { children } = props;
  useInView(`/${props.id}`);
  return (
    <div className=" w-screen snap-start p-2" {...props}>
      {children}
    </div>
  );
}
