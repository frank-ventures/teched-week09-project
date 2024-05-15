import { Inter } from "next/font/google";
import "./globals.css";
import "./header.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Void",
  description: "Not really a social network. Made by Frank."
};

export default async function RootLayout({ children }) {
  // Get the users Clerk ID:
  const { userId } = auth();
  console.log(userId);

  // I'm going to check if the userId is not null:
  if (userId) {
    const thisUser = await currentUser();

    console.log("there is a user id and it is ", userId);
    // Do they exist on my database or are they new?:
    const profiles = await db.query(
      `SELECT * FROM wknine_profiles WHERE clerk_id = '${userId}'`
    );
    // If they're new, add them to my database:
    if (profiles.rowCount === 0) {
      await db.query(
        `INSERT INTO wknine_profiles (clerk_id, username, bio) VALUES ($1, $2, $3)`,
        [userId, thisUser.username, `I am ${thisUser.firstName}`]
      );
    }
  } else {
    console.log("there is not a user id. Sadness");
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>

            <SignedIn>
              <div className="user-signed-in">
                <UserButton />
                <Link href="/profile">Your Profile</Link>
              </div>
            </SignedIn>

            <nav>
              <Link href="/">Home Feed</Link>
            </nav>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
