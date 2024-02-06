import Link from "next/link";

type Route = "home" | "craft" | "music";
interface NavLinkProps {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  className?: string;
  to?: Route;
}

const NavLink = ({
  children,
  active = false,
  onClick = () => {},
  className = "",
  to = undefined,
}: NavLinkProps) => {
  return (
    <>
      {to ? (
        <Link
          onClick={onClick}
          title={to}
          href={`/${to === "home" ? "" : to}`}
          className={`nav-link pointer-events-auto flex h-12 w-12 select-none flex-row items-center justify-center rounded-full border border-current no-underline shadow-lg transition hover:shadow-xl active:scale-90
         ${active ? "active" : ""}`}
        >
          {children} <p className="text-xs">{to}</p>
        </Link>
      ) : (
        <div
          className={
            className +
            ` nav-link pointer-events-auto flex h-12 w-12 cursor-pointer select-none flex-col items-center justify-center overflow-visible rounded-full border border-current no-underline shadow-lg transition hover:shadow-xl active:scale-90`
          }
          onClick={onClick}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default NavLink;
