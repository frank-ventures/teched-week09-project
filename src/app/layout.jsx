import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

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
    console.log("there is a user id and it is ", userId);
    // Do they exist on my database or are they new?:
    const profiles = await db.query(
      `SELECT * FROM wknine_profiles WHERE clerk_id = '${userId}'`
    );
    console.log(profiles);
    // If they're new, add them to my database:
    if (profiles.rowCount === 0) {
      await db.query(`INSERT INTO wknine_profiles (clerk_id) VALUES ($1)`, [
        userId
      ]);
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
              <UserButton />
            </SignedIn>
          </header>
          <main>
            <p>You are signed in and your user id from auth is {userId}</p>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
