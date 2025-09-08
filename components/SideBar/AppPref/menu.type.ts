import { IconType } from "react-icons";
import type { JSX } from "react";

export interface MenuItem {
  id: string;
  label: string;
  icon: IconType;
  path?: string;
  action?: any;
}

export type MenuItems = Array<MenuItem>;
