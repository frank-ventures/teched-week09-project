import { auth, currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SubmitFormButton from "./SubmitFormButton";

export default async function ProfilePage() {
  const { userId } = auth();

  if (userId) {
  }

  const thisUser = await currentUser();

  const databasereturn = await db.query(
    `SELECT * FROM wknine_profiles WHERE clerk_id = '${userId}'`
  );

  const thisUserOnDatabase = databasereturn.rows[0];

  async function updateUserProfile(formData) {
    "use server";

    const newUsername = formData.get("username");
    const newBio = formData.get("bio");
    console.log("User wrote: ", newUsername, newBio);

    await db.query(
      `
        UPDATE wknine_profiles 
        SET username = $1, bio = $2 
        WHERE clerk_id = 'user_2gV4bQPn4iQuruXJu0hDdg9MIV5';`,
      [newUsername, newBio]
    );

    revalidatePath("/profile");

    redirect(`/profile`);
  }

  return (
    <div>
      <SignedIn>
        <div className="user-avatar">
          {" "}
          <Image
            src={thisUser.imageUrl}
            alt={`${thisUser.firstName} photo`}
            width={200}
            height={200}
            className="user-avatar-image"
          />
        </div>

        <h2>{thisUser.firstName}, You are signed in</h2>
        <p>Your username on our database is: {thisUserOnDatabase.username}</p>
        <p>Your bio on our database is: {thisUserOnDatabase.bio}</p>
        <form action={updateUserProfile}>
          <label htmlFor="username">Change your username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Change your username if you like"
            defaultValue={thisUserOnDatabase.username}
          />
          <label htmlFor="bio">Change your bio</label>
          <input
            type="text"
            id="bio"
            name="bio"
            placeholder="Change your bio if you like"
            defaultValue={thisUserOnDatabase.bio}
          />
          <SubmitFormButton />
        </form>
      </SignedIn>
      <SignedOut>
        <h2>You are not signed in. For shame!</h2>
        <p>Sign in or up buttons here</p>
      </SignedOut>
    </div>
  );
}
