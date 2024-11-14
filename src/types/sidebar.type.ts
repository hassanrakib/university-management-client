import { ReactNode } from "react";

export type SidebarItem = {
  key: string;
  label: ReactNode;
  children?: SidebarItem[];
} | undefined;
