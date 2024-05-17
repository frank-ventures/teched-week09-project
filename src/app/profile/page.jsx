// Functionality imports
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile
} from "@clerk/nextjs";
import Image from "next/image";
import { db } from "@/lib/db";

// Style
import "./profile.css";
// Components
import PostsDisplay from "@/components/PostsDisplay";
import UpdateUserProfileForm from "@/components/UpdateUserProfileForm";
import MakeNewPost from "@/components/MakeNewPost";
import Shiny from "@/components/Shiny";

export default async function ProfilePage() {
  // Get user details:
  const { userId } = auth();
  const thisUser = await currentUser();
  // From our own database:
  const databasereturn = await db.query(
    `SELECT * FROM wknine_profiles WHERE clerk_id = '${userId}'`
  );
  const thisUserOnDatabase = databasereturn.rows[0];

  // Main jsx return:
  return (
    <div className="user-profile-page flex flex-col gap-2">
      <SignedIn>
        <section className="user-title-bar flex justify-center gap-4 items-end mt-2 ml-2">
          <div className="user-avatar">
            <Shiny>
              <UserButton />
            </Shiny>
          </div>
          <h2>{thisUser?.username}, You are signed in</h2>
        </section>

        <section className="user-details flex flex-col gap-2 p-2 w-4/5 bg-purple-500 bg-opacity-50 rounded ">
          <div className="user-name flex gap-4 justify-end">
            <p className="user-details-text w-3/12 text-right ">Display Name</p>
            <p className="w-9/12">{thisUserOnDatabase?.username}</p>
          </div>

          <div className="user-bio flex gap-4 justify-end">
            <p className="user-details-text w-3/12 text-right">Bio</p>
            <p className="w-9/12">{thisUserOnDatabase?.bio}</p>
          </div>
        </section>

        <h3>Update Your Profile</h3>
        {/* <UserProfile /> */}
        <UpdateUserProfileForm
          userId={userId}
          thisUserOnDatabase={thisUserOnDatabase}
        />
        <h3>Add to the void</h3>
        <MakeNewPost />
        <h3>Your Posts</h3>
        <PostsDisplay userId={userId} />
      </SignedIn>
      <SignedOut>
        <h3>You are not signed in. For shame!</h3>
        <SignInButton />

        <p>Sign in or up buttons here</p>
      </SignedOut>
    </div>
  );
}
