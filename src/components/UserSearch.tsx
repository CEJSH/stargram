"use client";
import { ProfileUser } from "@/model/user";
import React, { FormEvent, useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import useSWR from "swr";
import GridSpinner from "./ui/GridSpinner";
import UserCard from "./UserCard";
import useDebounce from "@/hooks/debounce";

// /api/search/${keyword}
// 검색하는 keyword가 있다면 /api/search/${keyword} -> 유저네임이나, 네임
// 검색하는 keyword가 없다면 /api/search -> 전체 유저

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<ProfileUser[]>(`/api/search/${debouncedKeyword}`);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault;
  };

  return (
    <>
      <form
        className="
        h-[54px] justify-center items-center w-full"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          autoFocus
          className="bg-white rounded-2xl h-full pl-[46px] text-[16px] w-full border-[1px] border-[#8e8e8e]"
          placeholder="Search for a username or name"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <div className="absolute left-6 top-[1.15rem]">
          <HiMiniMagnifyingGlass />
        </div>
      </form>
      {error && <p className="p-4">무언가가 잘못 되었음</p>}
      {isLoading && (
        <div className="p-4">
          <GridSpinner />
        </div>
      )}
      {!isLoading && !error && users?.length === 0 && (
        <p className="p-4">찾는 사용자가 없음 😇</p>
      )}
      <ul className="w-full p-4">
        {users &&
          users.map((user, index) => (
            <li key={index}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </>
  );
}
