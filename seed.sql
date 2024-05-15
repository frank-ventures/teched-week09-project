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