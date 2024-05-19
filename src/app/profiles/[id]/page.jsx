import PostsDisplay from "@/components/PostsDisplay";
import { db } from "@/lib/db";
import Image from "next/image";
import "./otherUser.css";
import { notFound } from "next/navigation";

// This page lets the logged-in user see other users profile page:
export default async function UserProfileDisplay({ params }) {
  // Lets go get that users details!:
  const databasereturn = await db.query(
    `SELECT * FROM wknine_profiles WHERE id = '${params.id}'`
  );
  // Tidying up the return:
  const thisUser = databasereturn.rows[0];

  // If there is a user with that ID in our database, show them. If not, then show the 'not found' page:
  return (
    <>
      {thisUser ? (
        <div className="other-users-profile flex flex-col gap-2 mt-16">
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

          <section className="user-details flex flex-col gap-2 p-2 w-7/12 bg-purple-500 bg-opacity-50 rounded ">
            <div className="user-name flex gap-4 justify-end">
              <p className="user-details-text w-3/12 text-right">
                Display Name
              </p>
              <p className="w-9/12">{thisUser?.username}</p>
            </div>

            <div className="user-bio flex gap-4 justify-end">
              <p className="user-details-text w-3/12 text-right">Bio</p>
              <p className="w-9/12">{thisUser?.bio}</p>
            </div>
          </section>

          <h3>Their Posts</h3>
          <PostsDisplay localId={thisUser?.id} />
        </div>
      ) : (
        notFound()
      )}{" "}
    </>
  );
}
