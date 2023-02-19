export default function Section(props?: any) {
  const { children } = props;

  return (
    <div className=" w-screen border-4 border-red-500 p-2" {...props}>
      {children}
    </div>
  );
}
