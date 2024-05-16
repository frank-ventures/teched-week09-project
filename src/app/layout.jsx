// --- --- --- ---
// Functionality import
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
// --- --- --- ---
// Components import
import NavBar from "@/components/NavBar";
// --- --- --- ---
// Styling import
import { Inter } from "next/font/google";
import "./globals.css";
import "./header.css";
import { revalidatePath } from "next/cache";

const inter = Inter({ subsets: ["latin"] });

// --- --- --- ---
// Metadata
export const metadata = {
  title: "The Void",
  description: "Not really a social network. Made by Frank."
};

// --- --- --- ---
// Main Website Layout
export default async function RootLayout({ children }) {
  // Get the users Clerk ID:
  const { userId } = auth();

  let profiles;
  // I'm going to check if the userId is not null:
  if (userId) {
    const thisUser = await currentUser();

    if (thisUser) {
      await db.query(
        `
          UPDATE wknine_profiles
          SET imageurl = $1
            WHERE clerk_id = '${userId}';`,
        [thisUser.imageUrl]
      );
      revalidatePath("/");
    }
    // Do they exist on my database or are they new?:

    profiles = await db.query(
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
            <NavBar />
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
