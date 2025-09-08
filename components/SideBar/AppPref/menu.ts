import { MdHome, MdSearch, MdLibraryMusic } from "react-icons/md";
import { actions } from "./actions";

import type { MenuItems } from "./menu.type";

const navMenu: MenuItems = [
  {
    id: "sideMenu_1",
    label: "Home",
    icon: MdHome,
    path: "/",
    action: actions.home,
  },
  {
    label: "Search",
    id: "sideMenu_2",
    icon: MdSearch,
    action: actions.search,
  },
  {
    label: "Your Library",
    id: "sideMenu_3",
    icon: MdLibraryMusic,
    path: "/library",
    action: actions.library,
  },
];

export default navMenu;
