"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const nav = "p-2";
  const active = "bg-white text-black font-bold rounded-2xl p-2";
  const pathName = usePathname();
  const links = [
    { name: "HOME", href: "/" },
    { name: "STREAMING", href: "/streaming" },
    { name: "CSR and SSR", href: "/csr_ssr_composition" },
    {name:"GITHUB SEARCH",href:"/github_user"}
  ];
  return (
    <div>
      <nav className="m-5 flex gap-4 justify-center">
        {links.map((l) => (
          <Link
            key={l.name}
            href={l.href}
            className={l.href === pathName ? active : nav}
          >
            {l.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
