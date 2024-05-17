import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="sign-in-page h-screen flex justify-center items-center z-0 relative">
      <SignIn />
    </div>
  );
}
