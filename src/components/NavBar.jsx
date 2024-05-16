"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState } from "react";

export default function NavBar() {
  // For hamburger menu
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  const pathname = usePathname();

  const isSubRoute = (route) => pathname.startsWith(route);

  return (
    <>
      <button
        onClick={handleClick}
        className="hamburger-button flex flex-col justify-center items-center p-2 border-2 border-white border-opacity-25"
      >
        {" "}
        <span
          className={`bg-orange-500 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
          }`}
        ></span>
        <span
          className={`bg-orange-500 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`bg-orange-500 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
          }`}
        ></span>
      </button>

      <header
        className={`transition-all duration-300 ${
          isOpen
            ? "opacity-100 left-0"
            : "opacity-0 left-[-20%] pointer-events-none"
        }`}
      >
        {" "}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <div className="user-signed-in">
            <UserButton />
            <Link
              href="/profile"
              className={`link fancy-link ${
                pathname === "/profile" ? "active-link" : ""
              }`}
            >
              Your Profile
            </Link>
          </div>
        </SignedIn>
        <nav>
          <Link
            href="/"
            className={`link fancy-link ${
              pathname === "/" ? "active-link" : ""
            }`}
          >
            Home Feed
          </Link>
          <Link
            href="/about"
            className={`link fancy-link ${
              pathname === "/about" ? "active-link" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/others"
            className={`link fancy-link ${
              isSubRoute("/others") ? "active-link" : ""
            }`}
          >
            Other Users
          </Link>
        </nav>
      </header>
    </>
  );
}
