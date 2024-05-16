"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <>
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
          className={`link fancy-link ${pathname === "/" ? "active-link" : ""}`}
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
      </nav>
    </>
  );
}
