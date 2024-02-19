import Link from "next/link";

type Route = "home" | "work" | "music";
interface NavLinkProps {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  to?: Route;
}

const NavLink = ({
  children,
  active = false,
  onClick = () => {},
  to = undefined,
}: NavLinkProps) => {
  return (
    <Link
      onClick={onClick}
      title={to}
      href={`/${to === "home" ? "" : to}`}
      className={`nav-link pointer-events-auto flex h-12 w-12 select-none flex-row items-center justify-center rounded-full border border-current no-underline shadow-lg transition hover:shadow-xl active:scale-90
         ${active ? "active" : ""}`}
    >
      {children} <p className="text-xs">{to}</p>
    </Link>
  );
};

export default NavLink;
