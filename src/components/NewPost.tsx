"use client";
import { AuthUser } from "@/model/user";
import UserInfoBox from "./UserInfoBox";
import FilesIcon from "./ui/icons/FilesIcon";
import Button from "./ui/Button";
import { FormEvent, useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GridSpinner from "./ui/GridSpinner";

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image, name } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!file) return;

      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("text", textRef.current?.value ?? "");

      fetch("/api/posts", { method: "POST", body: formData })
        .then((res) => {
          if (!res.ok) {
            setError(`${res.status} ${res.statusText}`);
            return;
          }
          router.push("/");
        })
        .catch((err) => setError(err.toString()))
        .finally(() => setLoading(false));
    },
    [file, router]
  );
  return (
    <section className="w-full flex flex-col justify-center items-center mt-4 bg-white rounded-2xl h-[calc(100vh-124px)]">
      {loading && (
        <div className="absolute inset-0 z-20 text-center pt-[30%] bg-gray-500/30">
          <GridSpinner />
        </div>
      )}
      {error && (
        <p className="w-full bg-red-100 text-red-600 text-venter p-4 mb-4 font-bold">
          {error}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-1/2 h-2/3 justify-center"
      >
        <div className="w-full relative">
          <div className="bg-[#f3f3f4] py-3 text-center font-[600] rounded-t-xl">
            새 게시물 만들기{" "}
          </div>
          <Button
            text="공유하기"
            onClick={() => {}}
            red={false}
            className="text-sky-400 font-[600] !absolute top-[0.35rem] right-0 bg-transparent hover:bg-transparent"
          />
        </div>
        <div className="h-full flex flex-row rounded-b-xl overflow-hidden border-[1px] border-[#f3f3f4]">
          <input
            className="hidden"
            type="file"
            name="input"
            id="input-upload"
            accept="image/*"
            onChange={handleChange}
          />
          <label
            className={`w-7/12 flex flex-col items-center justify-center cursor-pointer ${
              !file && ""
            }`}
            htmlFor="input-upload"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {dragging && (
              <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none"></div>
            )}
            {!file && (
              <div className="flex flex-col gap-4 items-center pointer-events-none">
                <FilesIcon />
                <p>사진을 여기에 끌어다 놓으세요</p>
              </div>
            )}
            {file && (
              <div className="relative h-full w-full aspect-square">
                <Image
                  className="object-cover"
                  src={URL.createObjectURL(file)}
                  alt="local file"
                  fill
                  sizes="650px"
                />
              </div>
            )}
          </label>
          <section className="p-4 border-l-[1px] border-[#f3f3f4]">
            <UserInfoBox
              name={username}
              image={image ?? ""}
              className="!w-fit mb-3"
              size="small"
              onlyId
            />
            <textarea
              className="outline-none text-md border border-neutral-300 border-none resize-none"
              name="text"
              id="input-text"
              required
              rows={10}
              placeholder="문구를 입력하세요..."
              ref={textRef}
            ></textarea>
          </section>
        </div>
      </form>
    </section>
  );
}
