import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="sign-up-page h-screen flex justify-center items-center z-0 relative">
      <SignUp />
    </div>
  );
}
