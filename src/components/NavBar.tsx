"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import HomeIcon from "./ui/icons/HomeIcon";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import ColorButton from "./ui/ColorButton";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar";

const menu = [
  {
    href: "/",
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
    title: "Home",
  },
  {
    href: "/search",
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
    title: "Search users",
  },
  {
    href: "/new",
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
    title: "New Post",
  },
];
export default function NavBar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="h-[68px] w-full flex justify-between items-center px-[32px]">
      <Link
        href="/"
        aria-label="Home"
        className="cursor-pointer font-[700] text-[26px]"
      >
        <h1>Instagram</h1>
      </Link>
      <nav className="text-[26px] h-full flex items-center">
        <ul className="flex flex-row items-center gap gap-[16px] ">
          {menu.map((item) => (
            <li key={item.href}>
              <Link href={item.href} aria-label={item.title}>
                {pathname === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size={"small"} highlight />
              </Link>
            </li>
          )}{" "}
          <li>
            {session ? (
              <ColorButton
                className="text-[14px] font-[400] bg-white rounded-[0.275rem] p-[0.3rem] hover:opacity-90 transition-opacity"
                text="Sign Out"
                onClick={() => {
                  signOut();
                }}
              />
            ) : (
              <ColorButton
                className="text-[14px] font-[400] bg-white rounded-[0.275rem] p-[0.3rem] hover:opacity-90 transition-opacity"
                text="Sign In"
                onClick={() => {
                  signIn();
                }}
              />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
