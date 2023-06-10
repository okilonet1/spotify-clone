"use client";
import { FC } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types/types";
import MediaItem from "./MediaItem";
import { IconType } from "react-icons";
import Link from "next/link";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryProps {
  songs: Song[];
  icon: IconType;
  title: string;
  href?: string;
}

const Library: FC<LibraryProps> = ({ songs, title, icon: Icon, href }) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const onClick = () => {
    if (!user) {
      return authModal.open();
    }

    // if (!subscription) {
    //   return subscribeModal.onOpen();
    // }
    return uploadModal.open();
  };

  const onPlay = useOnPlay(songs);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <Icon className="text-neutral-400" size={26} />

          <p className="text-md font-medium text-neutral-400 hover:text-white">
            {href ? <Link href={href!}>{title}</Link> : title}
          </p>
        </div>
        {!href && (
          <AiOutlinePlus
            onClick={onClick}
            size={20}
            className="
          cursor-pointer 
          text-neutral-400 
          transition 
          hover:text-white
        "
          />
        )}
      </div>
      <div className="mt-4 flex flex-col gap-y-2 px-3">
        {songs.map((item) => (
          <MediaItem
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
