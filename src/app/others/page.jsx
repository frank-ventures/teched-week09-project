import { db } from "@/lib/db";
import Link from "next/link";

// This page lets us see other users profiles, and the posts that they have made.
export default async function OtherUsersProfiles() {
  // get all users from the database

  //   const allUsers = await db.query(`SELECT * FROM wknine_profiles`);

  //   console.log(allUsers.rows);

  // show them on the page

  return (
    <>
      <h2>View other users profiles</h2>
      {/* {allUsers.rows.map((user) => {
        return (
          <>
            <Link href={`/others/${user.id}`}>{user.username}</Link>
          </>
        );
      })} */}
    </>
  );
}
