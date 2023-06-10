import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { Figtree } from "next/font/google";
import Providers from "@/providers";
import getSongsByUserId from "@/helpers/getSongsByUserId";
import getLikedSongs from "@/helpers/getLikedSongs";
import Player from "@/components/Player";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "RCCG City of Refuge | Player",
  description: "Generated by create next app",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();

  const likedSongs = await getLikedSongs();

  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <Sidebar songs={userSongs} likedSongs={likedSongs}>
            {children}
          </Sidebar>
          <Player />
        </Providers>
      </body>
    </html>
  );
}
