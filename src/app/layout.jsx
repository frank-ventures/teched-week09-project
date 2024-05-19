// --- --- --- ---
// Functionality import
import { ClerkProvider } from "@clerk/nextjs";
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
import "@radix-ui/themes/styles.css";
import { revalidatePath } from "next/cache";

const inter = Inter({ subsets: ["latin"] });

// --- --- --- ---
// Main metadata:
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
    // This next statement allows us to update the users display image, should they change it in Clerk anywhere on our site:
    if (thisUser) {
      if (thisUser.imageUrl === null) {
        await db.query(
          `
            UPDATE wknine_profiles
            SET imageurl = $1
              WHERE clerk_id = '${userId}';`,
          [
            "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yZ1V6bkZVd2tGSkpoS3RLbWI3UTI0cWJIaHMiLCJyaWQiOiJ1c2VyXzJnYVU4Y3R2bldQaXpFYWZNTnIwcGQ3d2lUSSJ9"
          ]
        );

        revalidatePath("/");
      } else {
        await db.query(
          `
          UPDATE wknine_profiles
          SET imageurl = $1
            WHERE clerk_id = '${userId}';`,
          [thisUser.imageUrl]
        );
        revalidatePath("/");
      }
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
      revalidatePath("/");
    }
  } else {
    console.log("there is not a user id. Sadness");
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* NavBar acts as our 'header', hidden behind a 'hamburger' button: */}
          <NavBar />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
