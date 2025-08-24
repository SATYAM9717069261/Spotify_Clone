import { IconType } from "react-icons";
export interface MenuItem {
  id: string;
  label: string;
  path: string;
  action: () => void;
}

export type MenuItems = Array<MenuItem>;
