import { MdPlaylistAdd, MdFavorite } from "react-icons/md";
import { actions } from "./actions";

import type { MenuItems } from "./menu.type.ts";

const navMenu: MenuItems = [
  {
    id: "createPlaylist_1",
    label: "Create Playlist",
    icon: MdPlaylistAdd,
    path: "/create-playlist",
    action: actions.createPlaylist,
  },
  {
    label: "MyFavorites",
    id: "myfav_2",
    icon: MdFavorite,
    path: "/favorites",
    action: actions.favorite,
  },
];

export default navMenu;
