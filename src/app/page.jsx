import MakeNewPost from "@/components/MakeNewPost";
import PostsDisplay from "@/components/PostsDisplay";
import { SignedIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <div className="top-bar flex flex-col">
        <h1>The Void</h1>

        <p className="ml-3">
          When we put words to our fears and feelings, they lose their power
          over us.
        </p>
      </div>
      <SignedIn>
        <p className="ml-3">
          Cast your words into the void? We&apos;ll listen.
        </p>
        <MakeNewPost />
      </SignedIn>
      <PostsDisplay />
    </>
  );
}
