"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState } from "react";
import Shiny from "./Shiny";

export default function NavBar() {
  // For hamburger menu
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  // For highlighting which link the USer is on:
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
          <SignInButton className="fancy-link" />
        </SignedOut>
        <SignedIn>
          <div className="user-signed-in">
            {/* <Shiny> */}
            <UserButton />
            {/* </Shiny> */}
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
            href="/profiles"
            className={`link fancy-link ${
              isSubRoute("/profiles") ? "active-link" : ""
            }`}
          >
            All Users
          </Link>
        </nav>
      </header>
    </>
  );
}
