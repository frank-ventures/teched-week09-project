import { db } from "@/lib/db";
import Link from "next/link";

// This page lets us see other users profiles, and the posts that they have made:
export default async function OtherUsersProfiles() {
  // Get all users from the database:
  const allUsers = await db.query(`SELECT * FROM wknine_profiles`);

  // Show them on the page:
  return (
    <div className="other-users-container w-full mt-2 flex flex-col gap-4 items-center text-center">
      <h2 className="mb-2">View other users profiles</h2>
      {allUsers.rows.map((user) => {
        return (
          <>
            {/* Make them clickable and send them to /profiles/[id]: */}
            <Link
              className="bg-slate-500 w-5/12 text-center p-2 rounded"
              href={`/profiles/${user.id}`}
            >
              {user.username}
            </Link>
          </>
        );
      })}
    </div>
  );
}
