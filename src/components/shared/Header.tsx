"use client";

import React from "react";
import Link from "next/link";

export function Header() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-semibold tracking-wider font-playfair text-[#E5B05C]"
        >
          ISAPOV
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
          <a
            href="#hero"
            onClick={(e) => scrollTo(e, "hero")}
            className="hover:text-white transition-colors"
          >
            Главная
          </a>
          <a
            href="#portfolio"
            onClick={(e) => scrollTo(e, "portfolio")}
            className="hover:text-white transition-colors"
          >
            Портфолио
          </a>
          <a
            href="#services"
            onClick={(e) => scrollTo(e, "services")}
            className="hover:text-white transition-colors"
          >
            Услуги
          </a>
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "contact")}
            className="hover:text-white transition-colors"
          >
            Контакты
          </a>
        </nav>
      </div>
    </header>
  );
}
