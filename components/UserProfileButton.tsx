"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signOut, useSession } from "next-auth/react";

const UserProfileButton = () => {
  const router = useRouter();
  const session = useSession();
  // console.log(session);
  const { data } = session;
  if (session.status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center gap-2 font-[poppins]">
      <DropdownMenu>
        <DropdownMenuTrigger className="font-[lato] font-bold flex justify-center items-center gap-2 focus:outline-none">
          {/* {data?.user?.name} */}
          <Image
            src={data?.user?.image!}
            alt="profilepic"
            height={35}
            width={35}
            className="rounded-full border-rad"
          />
          <svg
            className="w-2.5 h-2.5 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="h-10  text-center w-36 ">
            {data?.user?.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="h-10 text-lg text-center w-36"
            onClick={() => {
              router.push("/profile");
            }}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="h-10 text-lg text-center w-36"
            onClick={() => {
              router.push("/cart");
            }}
          >
            Cart
          </DropdownMenuItem>
          <DropdownMenuItem
            className="h-10 text-lg text-center w-36"
            onClick={() => signOut()}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfileButton;
