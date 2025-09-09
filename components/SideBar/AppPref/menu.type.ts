import { IconType } from "react-icons";

export interface MenuItem {
  id: string;
  label: string;
  icon: IconType;
  path?: string;
  action?: any;
}

export type MenuItems = Array<MenuItem>;
