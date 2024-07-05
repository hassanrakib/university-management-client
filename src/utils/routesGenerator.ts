import { Item, Route } from "../types";

export const routesGenerator = (items: Item[]) => {
  return items.reduce((routes: Route[], item) => {
    if (item.path && item.element) {
      routes.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        routes.push({
          path: child.path!,
          element: child.element!,
        });
      });
    }

    return routes;
  }, []);
};
