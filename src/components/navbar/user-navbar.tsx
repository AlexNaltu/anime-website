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
    <div className="flex justify-end py-2 max-w-[1300px] mx-auto px-2 sm:px-4">
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
