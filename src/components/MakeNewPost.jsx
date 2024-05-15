import SubmitFormButton from "@/app/profile/SubmitFormButton";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function MakeNewPost() {
  const { userId } = auth();

  // Get their deets from my database, because we want just their 'id' when uploading the post:
  const profiles = await db.query(
    `SELECT * FROM wknine_profiles WHERE clerk_id = '${userId}'`
  );
  const usersDatabaseID = profiles.rows[0].id;

  // Submit to the database when post is made:
  async function submitNewPost(formData) {
    "use server";

    const postContent = formData.get("userPost");

    console.log("Your post is this: ", postContent);
    console.log("post submitted really...");

    await db.query(
      `INSERT INTO wknine_posts (profile_id, content) VALUES ($1, $2)`,
      [usersDatabaseID, postContent]
    );

    revalidatePath("/");
    redirect("/");
  }

  return (
    <>
      <p>hello. form goes here</p>
      <form action={submitNewPost}>
        <label htmlFor="userPost"></label>
        <input
          type="text"
          id="userPost"
          name="userPost"
          placeholder="Go on, you can share. It's safe.."
          defaultValue=""
        />
        <SubmitFormButton />
      </form>
    </>
  );
}
