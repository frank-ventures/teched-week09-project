import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import SubmitFormButton from "./SubmitFormButton";

export default async function MakeNewPost() {
  const { userId } = auth();

  // let profiles;
  // let usersDatabaseID;

  // Get their deets from my database, because we want just their 'id' when uploading the post:
  // if (userId) {

  // }

  // Submit to the database when post is made:
  async function submitNewPost(formData) {
    "use server";

    const profiles = await db.query(
      `SELECT * FROM wknine_profiles WHERE clerk_id = '${userId}'`
    );
    console.log("MakeNewPost.jsx: Profiles are - ", profiles.rows);
    const usersDatabaseID = profiles.rows[0].id;

    const postContent = formData.get("userPost");

    console.log("Your post is this: ", postContent);
    console.log("post submitted really...");

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
        <SubmitFormButton />
      </form>
    </>
  );
}
