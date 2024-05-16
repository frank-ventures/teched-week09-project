import PostsDisplay from "@/components/PostsDisplay";
import { db } from "@/lib/db";
import Image from "next/image";

// This page lets the user see and edit their own profile page.
export default async function UserProfileDisplay({ params }) {
  console.log("[id] page params: ", params);

  const databasereturn = await db.query(
    `SELECT * FROM wknine_profiles WHERE id = '${params.id}'`
  );
  const thisUser = databasereturn.rows[0];
  console.log("ProfileDisplay Page: db results - ", thisUser);

  let postsResult;
  if (thisUser) {
    postsResult = await db.query(`
    SELECT
    wknine_posts.content, wknine_posts.id, wknine_posts.profile_id,
    wknine_profiles.username AS username
  FROM wknine_posts
    JOIN wknine_profiles ON wknine_posts.profile_id = wknine_profiles.id
    WHERE wknine_posts.profile_id = ${params.id}
    `);
  }

  const reversedPosts = postsResult.rows.reverse();

  return (
    <div className="flex flex-col gap-2">
      <section className="user-title-bar flex gap-4 items-end mt-2">
        <div className="user-avatar">
          <Image
            src={thisUser?.imageurl}
            alt={`${thisUser?.firstName} photo`}
            width={200}
            height={200}
            className="user-avatar-image"
          />
        </div>
        <h2>{thisUser?.username}&apos;s profile</h2>
      </section>

      <section className="user-details flex flex-col gap-2 p-2 w-4/5 bg-purple-500 bg-opacity-50 rounded ">
        <div className="user-name flex gap-4 justify-end">
          <p className="user-details-text w-3/12 text-right">Display Name</p>
          <p className="w-9/12">{thisUser?.username}</p>
        </div>

        <div className="user-bio flex gap-4 justify-end">
          <p className="user-details-text w-3/12 text-right">Bio</p>
          <p className="w-9/12">{thisUser?.bio}</p>
        </div>
      </section>

      <h3>Their Posts</h3>
      <PostsDisplay localId={thisUser.id} />
    </div>
  );
}
