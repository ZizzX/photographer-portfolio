import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/50 bg-black py-12 text-zinc-400">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link
            href="/"
            className="text-2xl font-playfair text-white tracking-widest"
          >
            ISAPOV
          </Link>
          <p className="text-sm">Кинематографичная фотография и видеография.</p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#E5B05C] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="sr-only">Instagram</span>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#E5B05C] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
            <span className="sr-only">YouTube</span>
          </a>
          <a
            href="https://t.me/yourusername"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#E5B05C] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            <span className="sr-only">Telegram</span>
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between text-xs gap-4">
        <p>© {new Date().getFullYear()} Isapov. Все права защищены.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Политика конфиденциальности
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Пользовательское соглашение
          </Link>
        </div>
      </div>
    </footer>
  );
}
