"use client";
import NextImage from "next/image";
import AppPref from "./AppPref";
import UserPref from "./UserPref";
import PlayList from "./PlayList";
import { usePlaylist } from "@hooks/usePlaylist";
import useAddElement from "@hooks/useAddElement";

import OnScreenActions from "@components/OnScreenActions/OnScreenActions";

const Sidebar = () => {
  const { playlists } = usePlaylist();
  const { element, addElement, clearElement } = useAddElement();
  console.log(" element => ", element);
  return (
    <div className="container h-full">
      <OnScreenActions dom={element && element.dom} callback={clearElement} />
      <div className="sidebar-header w-full p-6 flex align-items-center justify-center">
        <NextImage
          src="./logo.svg"
          height={60}
          width={120}
          alt="Spotify Logo"
        />
      </div>

      <div className="sidebar-content gap-2">
        <AppPref addElement={addElement} />
        <UserPref />

        <PlayList playlists={playlists} />
      </div>
    </div>
  );
};
export default Sidebar;
