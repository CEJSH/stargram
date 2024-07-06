import Image from "next/image";
import React from "react";
import user from "../../public/images/10.jpg";

type Props = {
  name: string;
  userId?: string;
  location?: string;
  image: string;
};
const imageStyle = "object-cover w-[46px] h-[46px] rounded-[50%]";

export default function UserInfoBox({ name, location, userId, image }: Props) {
  return (
    <div className="w-full flex gap-[12px] text-[14px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {!!image ? (
        <img
          className={imageStyle}
          src={image ?? ""}
          alt="user"
          referrerPolicy="no-referrer"
        />
      ) : (
        <Image
          className={imageStyle}
          src={user}
          alt="user"
          referrerPolicy="no-referrer"
        />
      )}
      <div className="flex flex-col leading-5">
        <div className="font-[500] text-[#1c1e21]">{userId || "Anton"}</div>
        <div className="text-[#9e9ea7]">
          {location || name || "New Jersey, USA"}
        </div>
      </div>
    </div>
  );
}
