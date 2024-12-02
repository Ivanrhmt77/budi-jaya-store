import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";
import { title } from "process";
import { url } from "inspector";

type Proptypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bx bxs-dashboard",
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bx bxs-t-shirt",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "bx bxs-user",
  },
];

const AdminLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem} />
      {children}
    </div>
  );
};

export default AdminLayout;
