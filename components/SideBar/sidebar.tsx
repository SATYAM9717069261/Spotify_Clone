"use client";
import NextImage from "next/image";
import AppPref from "./AppPref";
import UserPref from "./UserPref";
import PlayList from "./PlayList";
import { usePlaylist } from "@hooks/usePlaylist";

function Sidebar() {
  const { playlists } = usePlaylist();
  console.log(" details  => ", playlists);
  return (
    <div className="container h-full">
      <div className="sidebar-header w-full p-6 flex align-items-center justify-center">
        <NextImage
          src="./logo.svg"
          height={60}
          width={120}
          alt="Spotify Logo"
        />
      </div>

      <div className="sidebar-content gap-2">
        <AppPref />
        <UserPref />
        <PlayList playlists={playlists} />
      </div>
    </div>
  );
}
export default Sidebar;
