"use client";
import { ReactNode } from "react";
import { Layout } from "./layout";

interface Props {
  children: ReactNode;
  requireLayout?: boolean;
}

export default function ClientLayout({
  children,
  requireLayout = true,
}: Props) {
  return requireLayout ? <Layout>{children}</Layout> : <>{children}</>;
}
