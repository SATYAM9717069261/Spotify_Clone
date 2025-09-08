import React from "react";
import Dialog from "@components/Search/dialog";
import type { JSX } from "react";
import { onScreenActionTypeSet } from "@components/OnScreenActions/type";

function home() {
  console.log("home action Trigger");
}

function search(setter: onScreenActionTypeSet): JSX.Element {
  return <Dialog setter={setter} />;
}

function library() {
  console.log("library action Trigger");
}

export const actions = {
  home,
  search,
  library,
};
