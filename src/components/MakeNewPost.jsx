import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import ToastNote from "./RadixToast";

export default async function MakeNewPost() {
  const { userId } = auth();

  // Submit to the database when post is made:
  async function submitNewPost(formData) {
    "use server";

    // First get the Users ID:
    const profiles = await db.query(
      `SELECT * FROM wknine_profiles WHERE clerk_id = '${userId}'`
    );
    const usersDatabaseID = profiles.rows[0].id;

    const postContent = formData.get("userPost");

    // console.log("Your post is this: ", postContent);
    // Pop the post into the database tied to the Users ID:
    await db.query(
      `INSERT INTO wknine_posts (profile_id, content) VALUES ($1, $2)`,
      [usersDatabaseID, postContent]
    );

    revalidatePath("/");
  }

  return (
    <>
      <form
        action={submitNewPost}
        className="user-form submit-post-form flex gap-2 justify-center items-start p-2 bg-purple-400 rounded"
      >
        <label htmlFor="userPost"></label>
        <input
          type="text"
          id="userPost"
          name="userPost"
          placeholder="Go on, you can share. It's safe.."
        />

        <ToastNote />
      </form>
    </>
  );
}
