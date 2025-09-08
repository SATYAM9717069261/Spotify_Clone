import type { JSX } from "react";

export type onScreenActionsType = {
  dom?: JSX.Element | null;
  callback?: () => void;
};

export type onScreenActionTypeSet = onScreenActionsType | null;
