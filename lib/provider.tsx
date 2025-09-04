"use client";

import { store } from "@libs/store";
import { StoreProvider } from "easy-peasy";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <StoreProvider store={store}>{children}</StoreProvider>;
}
