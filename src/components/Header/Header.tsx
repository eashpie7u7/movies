"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Cherry } from "lucide-react";

const links = [
  { href: "/popular", label: "Popular" },
  { href: "/now-playing", label: "Now Playing" },
  { href: "/top-rated", label: "Top Rated" },
  { href: "/my-favorites", label: "My Favorites" },
];

const Header = () => {
  const pathname = usePathname();
  return (
    <div>
      <header className=" bg-pink-100 w-full border-b shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="text-lg font-bold text-gray-700 hover:text-pink-700 transition-colors flex items-center gap-2"
          >
            <Cherry className="w-5 h-5 text-pink-600" />
            Movies DB
          </Link>
          <nav className="flex gap-6">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "text-sm font-medium transition-colors hover:text-rose-500",
                  pathname === href
                    ? "text-pink-600 underline"
                    : "text-gray-600"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
