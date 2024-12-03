import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";

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
    icon: "bx bxs-user-account",
  },
];

const AdminLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar title="Budi Jaya Store (Admin)" lists={listSidebarItem} />
      <div className={styles.admin__main}>{children}</div>
    </div>
  );
};

export default AdminLayout;
