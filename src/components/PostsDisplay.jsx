import { db } from "@/lib/db";

export default async function PostsDisplay() {
  // get all posts
  const postsResult = await db.query(`
  SELECT
  wknine_posts.content, wknine_posts.id,
  wknine_profiles.username AS username
FROM wknine_posts
  JOIN wknine_profiles ON wknine_posts.profile_id = wknine_profiles.id
  `);

  console.log(postsResult.rows);

  //map them to the page
  return (
    <>
      <p>There would be posts here</p>
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
