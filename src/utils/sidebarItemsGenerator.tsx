import { NavLink } from "react-router-dom";
import { Item, SidebarItem } from "../types";

export const sidebarItemsGenerator = (items: Item[], role: string) => {
  return items.reduce((sidebarItems: SidebarItem[], item) => {
    if (item.name && item.path) {
      sidebarItems.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      sidebarItems.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          return {
            key: child.name,
            label: (
              <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
            ),
          };
        }),
      });
    }

    return sidebarItems;
  }, []);
};
