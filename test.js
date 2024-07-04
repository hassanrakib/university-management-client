const adminPaths2 = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "Admin_Dashboard",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: "Create_Admin",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "Create_Faculty",
      },
      {
        name: "Create Student",
        path: "create-student",
        element: "Create_Student",
      },
    ],
  },
];

export const newArr = adminPaths2.reduce((acc, item) => {
  if (item.name && item.path) {
    acc.push({
      key: item.name,
      label: `<NavLink to="/admin/${item.path}">${item.name}</NavLink>`,
    });
  }

  if (item.children) {
    acc.push({
      key: item.name,
      label: item.name,
      children: item.children.map((child) => {
        return {
          key: child.name,
          label: `<NavLink to="/admin/${child.path}">${child.name}</NavLink>`,
        };
      }),
    });
  }

  return acc;
}, []);

console.log(newArr);
