import { actions } from "./actions";

import type { MenuItems } from "./menu.type.ts";

const navMenu: MenuItems = [
  {
    id: "1",
    label: "Playlist Name",
    path: "/",
    action: actions.playlist,
  },
  {
    label: "Playlist_Name",
    id: "2",
    path: "/search",
    action: actions.playlist,
  },
  {
    label: "Playlist_Name",
    id: "3",
    path: "/search",
    action: actions.playlist,
  },
  {
    label: "Playlist_Name",
    id: "4",
    path: "/search",
    action: actions.playlist,
  },
  {
    label: "Playlist_Name LARGE TEXT HERE ",
    id: "5",
    path: "/search",
    action: actions.playlist,
  },
];

export default navMenu;
