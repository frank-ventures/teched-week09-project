-- Create Frankie Tadpoles
CREATE TABLE IF NOT EXISTS wknine_profiles(
  id SERIAL PRIMARY KEY,
  clerk_id TEXT,
  username TEXT,
  bio TEXT
);

CREATE TABLE IF NOT EXISTS wknine_posts (
  id SERIAL PRIMARY KEY,
  profile_id INT REFERENCES wknine_profiles(id),
  content TEXT
)


 -- Check our user existson my database or are they new?:
await db.query(
      `SELECT * FROM wknine_profiles WHERE clerk_id = '${userId}'`
    )
-- If they're new, add them to my database:
await db.query(
        `INSERT INTO wknine_profiles (clerk_id, username, bio) VALUES ($1, $2, $3)`,
        [userId, thisUser.username, `I am ${thisUser.firstName}`]
      );

-- Update Profile Stuff:
    await db.query(
      `
        UPDATE wknine_profiles 
        SET username = $1, bio = $2 
        WHERE clerk_id = 'user_2gV4bQPn4iQuruXJu0hDdg9MIV5';`,
      [newUsername, newBio]
    );

-- Get the posts with their usernames:
await db.query(`
  SELECT
  wknine_posts.content, wknine_posts.id,
  wknine_profiles.username AS username
FROM wknine_posts
  JOIN wknine_profiles ON wknine_posts.profile_id = wknine_profiles.id
  `);