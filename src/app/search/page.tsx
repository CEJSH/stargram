"use client";
import UserSearch from "@/components/UserSearch";
import React from "react";

export default function SearchPage() {
  return (
    <section className="overflow-y-auto mx-auto  max-w-screen-2xl gap-[16px] flex justify-center w-full py-[24px]">
      <div className="relative h-full flex flex-col gpa-[12px] items-center md:w-2/5 w-3/5">
        <UserSearch />
      </div>
    </section>
  );
}
