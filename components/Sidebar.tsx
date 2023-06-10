"use client";

import { FC, useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types/types";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
  likedSongs: Song[];
}

const Sidebar: FC<SidebarProps> = ({ children, songs, likedSongs }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-full">
      <div className="hidden h-full w-[300px] flex-col gap-y-2 bg-black p-2 md:flex">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route} />
            ))}
          </div>
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library songs={songs} title="Your Library" icon={TbPlaylist} />
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library
            title="Liked Tracks"
            songs={likedSongs}
            icon={AiOutlineHeart}
            href="/liked"
          />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
