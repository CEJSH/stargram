"use client";
import React from "react";
import UserInfoBox from "./UserInfoBox";
import useSWR from "swr";
import { HomeUser } from "@/model/user";
import { PropagateLoader } from "react-spinners";
import Link from "next/link";

export default function FollowingBar({ className }: { className: string }) {
  const { data, isLoading: loading, error } = useSWR<HomeUser>("/api/me");
  const users = data?.following && [
    ...data?.following,
    ...data?.following,
    ...data?.following,
  ];
  return (
    <section
      className={
        className +
        " bg-white rounded-2xl text-[12px] text-[#c7c7c7] py-[20px] md:px-[40px] px-0 md:mx-[16px] mx-0 gap-[16px]"
      }
    >
      <div className="text-[20px] font-[600] pt-[8px] md:block hidden">
        Following
      </div>
      {loading ? (
        <div className="pt-[24px] flex w-full justify-center">
          <PropagateLoader className="self-center" color={"gray"} size={7} />
        </div>
      ) : (
        (!users || users.length === 0) && <p>{`You don't hve following`}</p>
      )}
      {users && users.length > 0 && (
        <ul className="flex md:flex-col flex-row md:gap-0 gap-4 max-h-full no-scrollbar overflow-y-auto overflow-x-auto">
          {users.map(({ image, username, name }, i) => (
            <li className="md:mb-[16px] mb-0 flex-none" key={i}>
              <Link href={`/user/${username}`}>
                <UserInfoBox
                  following={true}
                  name={name}
                  userId={username}
                  image={image}
                  size="large"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
