import { db } from "@/lib/db";

export default async function PostsDisplay(params) {
  // Query the database so that we can match a users profile, then get their ID.
  const databasereturn = await db.query(
    `SELECT * FROM wknine_profiles WHERE clerk_id = '${params.userId}'`
  );
  // Wrangling the data. 'thisUserOnDatabase.id' is what we need:
  const thisUserOnDatabase = databasereturn.rows[0];
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
    wknine_posts.content, wknine_posts.id,
    wknine_profiles.username AS username
  FROM wknine_posts
    JOIN wknine_profiles ON wknine_posts.profile_id = wknine_profiles.id
    WHERE wknine_posts.profile_id = ${thisUserOnDatabase.id}
    `);
  } else {
    // Otherwise, get all the posts:
    postsResult = await db.query(`
    SELECT
    wknine_posts.content, wknine_posts.id,
    wknine_profiles.username AS username
  FROM wknine_posts
    JOIN wknine_profiles ON wknine_posts.profile_id = wknine_profiles.id
    `);
  }

  //Map the results to the page
  return (
    <>
      {postsResult.rows.map((post) => {
        return (
          <div key={post.id + post.username}>
            <h3>{post.username} wrote:</h3>
            <p>{post.content}</p>
          </div>
        );
      })}
    </>
  );
}
