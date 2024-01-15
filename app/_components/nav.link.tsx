import Link from "next/link";

type Route = "home" | "craft" | "music";
interface NavLinkProps {
  children: React.ReactNode;
  play: () => void;
  active?: boolean;
  className?: string;
  to?: Route;
  onClick?: () => void;
}

const NavLink = ({
  children,
  play,
  active = false,
  className = "",
  to = undefined,
  onClick = () => {},
}: NavLinkProps) => {
  return (
    <>
      {to ? (
        <Link
          onClick={() => play()}
          title={to}
          href={`/${to === "home" ? "" : to}`}
          className={`nav-link pointer-events-auto flex h-12 w-12 select-none flex-col items-center justify-center rounded-full border border-current no-underline shadow-lg transition hover:shadow-xl active:scale-90
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
