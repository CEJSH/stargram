import React from "react";

type Props = { image?: string | null };
// 구글 통해서 전해지는 url은 NextImage 쓸 수 없으므로 img 태그 씀

export default function Avatar({ image }: Props) {
  return (
    <div className="w-9 h-9 rounded-full items-center p-[0.095rem] bg-gradient-to-bl from-fuchsia-600 to-amber-300">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="rounded-full p-[0.06rem]"
        src={image ?? undefined}
        alt={"userImg"}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
