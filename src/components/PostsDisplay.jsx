import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import RadixAvatar from "./RadixAvatar";

export default async function PostsDisplay(params) {
  console.log("PostDisplay.jsx: Params are ", params);

  let databasereturn;

  // Query the database so that we can match a users profile, then get their ID.
  // Get posts by Clerk ID:
  if (params.userId) {
    databasereturn = await db.query(
      `SELECT * FROM wknine_profiles WHERE clerk_id = '${params.userId}'`
    );
    // Get posts by local database ID:
  } else if (params.localId) {
    databasereturn = await db.query(
      `SELECT * FROM wknine_profiles WHERE id = '${params.localId}'`
    );
  }

  // Wrangling the data. 'thisUserOnDatabase.id' is what we need:
  const thisUserOnDatabase = databasereturn?.rows[0];
  console.log(
    "PostsDisplay.jsx: This user on our db is - ",
    thisUserOnDatabase
  );

  // Probably naughty
  let postsResult;

  // Lets us show only the users posts, on their profile page:
  if (thisUserOnDatabase) {
    postsResult = await db.query(`
    SELECT
    wknine_posts.content, wknine_posts.id, wknine_posts.profile_id,
    wknine_profiles.username AS username,
     wknine_profiles.imageurl AS imageurl
  FROM wknine_posts
    JOIN wknine_profiles ON wknine_posts.profile_id = wknine_profiles.id
    WHERE wknine_posts.profile_id = ${thisUserOnDatabase.id}
    `);
  } else {
    // Otherwise, get all the posts:
    postsResult = await db.query(`
    SELECT
    wknine_posts.content, wknine_posts.id, wknine_posts.profile_id,
    wknine_profiles.username AS username,
     wknine_profiles.imageurl AS imageurl
  FROM wknine_posts
    JOIN wknine_profiles ON wknine_posts.profile_id = wknine_profiles.id
    `);
  }
  const reversedPosts = postsResult.rows.reverse();

  //Map the results to the page
  return (
    <div className="posts-container">
      <p className="opacity-80 pl-4">Latest</p>

      {reversedPosts.map((post) => {
        return (
          <div
            className="individual-post flex gap-3 items-center mb-3 mt-1 p-2 w-full rounded-lg bg-slate-200 bg-opacity-30 shadow"
            key={post.id + post.username}
          >
            <div className="post-image">
              {/* <Image
                src={post.imageurl ? post.imageurl : "/defaultImage.webp"}
                alt={post.title}
                width={100}
                height={100}
              /> */}
              <RadixAvatar
                src={post.imageurl ? post.imageurl : "/defaultImage.webp"}
                alt={post.username}
              />
            </div>
            <div className="flex flex-col">
              <Link
                href={`/profiles/${post.profile_id}`}
                className="border-b-2 border-r-2 w-fit ml-2 pr-2 pl-2 border-purple-400 border-opacity-75 mb-1 italic opacity-70 rounded "
              >
                {post.username}
              </Link>
              <p className="ml-4 text-lg p-1">{post.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
