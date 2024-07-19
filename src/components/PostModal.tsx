import React from "react";
import CloseButton from "./ui/icons/CloseButton";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};
export default function PostModal({ onClose, children }: Props) {
  return (
    <section
      className="z-50 fixed top-0 left-0 flex flex-col w-full h-full justify-center items-center bg-neutral-900/70"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className="fixed top-0 right-0 p-4 text-white"
        onClick={() => onClose()}
      >
        <CloseButton />
      </button>
      <div className="bg-white w-[76%] h-[95%] max-w-7xl rounded-r">
        {children}
      </div>
    </section>
  );
}
