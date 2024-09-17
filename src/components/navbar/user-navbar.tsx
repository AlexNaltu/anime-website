"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";

const UserNavbar = () => {
  return (
    <div className="flex justify-end py-2 max-w-[1500px] mx-auto px-2">
      <SignedIn>
        <div className="flex gap-3">
          <SignOutButton />
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
};

export default UserNavbar;
