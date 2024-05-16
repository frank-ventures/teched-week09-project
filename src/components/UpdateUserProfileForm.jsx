import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import SubmitFormButton from "./SubmitFormButton";

export default function UpdateUserProfileForm({ userId, thisUserOnDatabase }) {
  async function updateUserProfile(formData) {
    "use server";

    const newUsername = formData.get("username");
    const newBio = formData.get("bio");

    await db.query(
      `
            UPDATE wknine_profiles 
            SET username = $1, bio = $2 
            WHERE clerk_id = '${userId}';`,
      [newUsername, newBio]
    );

    revalidatePath("/");
  }

  return (
    <>
      <form
        action={updateUserProfile}
        className="user-form user-profile-form flex flex-col gap-2 p-2 bg-purple-500 rounded"
      >
        <label htmlFor="username" className="italic">
          Change your username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Change your username if you like"
          defaultValue={thisUserOnDatabase.username}
        />
        <label htmlFor="bio" className="italic">
          Change your bio
        </label>
        <textarea
          rows={4}
          type="text"
          id="bio"
          name="bio"
          placeholder="Change your bio if you like"
          defaultValue={thisUserOnDatabase.bio}
        />
        <SubmitFormButton />
      </form>
    </>
  );
}
