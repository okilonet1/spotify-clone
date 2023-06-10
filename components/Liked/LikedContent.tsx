"use client";

import { Song } from "@/types/types";
import { FC, useEffect } from "react";
import MediaItem from "../MediaItem";
import LikeButton from "../LikeButton";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContentProps {
  songs: Song[];
}

const LikedContent: FC<LikedContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div
        className="
          flex 
          w-full 
          flex-col 
          gap-y-2 px-6 
          text-neutral-400
        "
      >
        No liked songs.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-y-2 p-6">
      {songs.map((song: any) => (
        <div key={song.id} className="flex w-full items-center gap-x-4">
          <div className="flex-1">
            <MediaItem onClick={(id) => onPlay(id)} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
