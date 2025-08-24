import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import type { MenuItems } from "./menu.type.ts";

const navMenu: MenuItems = [
  {
    id: "sideMenu_1",
    label: "Home",
    icon: MdHome,
    path: "/",
  },
  {
    label: "Search",
    id: "sideMenu_2",
    icon: MdSearch,
    path: "/search",
  },
  {
    label: "Your Library",
    id: "sideMenu_3",
    icon: MdLibraryMusic,
    path: "/library",
  },
];

export default navMenu;
