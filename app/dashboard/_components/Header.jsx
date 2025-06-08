"use client"

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-secondary shadow-md p-4 flex items-center justify-between relative">
      <Image src="/logo.svg" width={160} height={100} alt="logo" />

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-6">
        <Link
          href="/dashboard"
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard" ? "text-primary font-bold" : ""
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/Question"
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard/Question" ? "text-primary font-bold" : ""
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Questions
        </Link>
        <Link
          href="/dashboard/upgrade"
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard/upgrade" ? "text-primary font-bold" : ""
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Upgrade
        </Link>
        <Link
          href="/dashboard/howItWorks"
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === "/dashboard/howItWorks" ? "text-primary font-bold" : ""
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          How it Works?
        </Link>
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {/* Hamburger icon */}
        <svg
          className="w-6 h-6 text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {mobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-secondary shadow-md flex flex-col gap-4 p-4 z-50">
          <Link
            href="/dashboard"
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/dashboard" ? "text-primary font-bold" : ""
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/Question"
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/dashboard/Question" ? "text-primary font-bold" : ""
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Questions
          </Link>
          <Link
            href="/dashboard/upgrade"
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/dashboard/upgrade" ? "text-primary font-bold" : ""
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Upgrade
          </Link>
          <Link
            href="/dashboard/howItWorks"
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/dashboard/howItWorks" ? "text-primary font-bold" : ""
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            How it Works?
          </Link>
        </nav>
      )}

      <UserButton />
    </header>
  );
}

export default Header;
