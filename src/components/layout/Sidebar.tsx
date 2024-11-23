import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { selectToken } from "../../redux/features/auth/authSlice";
import { NavLink } from "react-router-dom";
import { SidebarItem } from "../../types";

const { Sider } = Layout;

const ROLE = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

export default function Sidebar() {
  const token = useAppSelector(selectToken);

  let user = null;

  if (token) user = verifyToken(token);

  let sidebarItems: SidebarItem[] = [
    {
      key: "About",
      label: <NavLink to="about">About</NavLink>,
    },
    {
      key: "Contact",
      label: <NavLink to="contact">Contact</NavLink>,
    },
  ];

  switch (user?.role) {
    case ROLE.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, ROLE.ADMIN);
      break;

    case ROLE.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, ROLE.FACULTY);
      break;
    case ROLE.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, ROLE.STUDENT);
      break;
    default:
      break;
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div style={{ color: "white", textAlign: "center", padding: "18px 0" }}>
        <h1>University Management</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
}
