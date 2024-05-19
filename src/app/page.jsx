import MakeNewPost from "@/components/MakeNewPost";
import PostsDisplay from "@/components/PostsDisplay";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="home-container">
      <div className="top-bar flex flex-col">
        <div className="flex gap-4 p-1">
          <Image
            src={"/void-logo-design.png"}
            alt={"logo"}
            height={100}
            width={100}
          />
          <h1>The Void</h1>
        </div>

        <p className="ml-3">
          When we put words to our fears and feelings, they lose their power
          over us.
        </p>
      </div>
      {/* Only signed in users should be able to make posts: */}
      <SignedIn>
        <p className="ml-3">
          Cast your words into the void? We&apos;ll listen.
        </p>
        <MakeNewPost />
      </SignedIn>
      {/* We always want any users to see the posts on our site: */}
      <PostsDisplay />
    </div>
  );
}
