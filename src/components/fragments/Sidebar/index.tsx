import { useRouter } from "next/router";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";

type Proptypes = {
  title: string;
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
};

const Sidebar = (props: Proptypes) => {
  const { title, lists } = props;
  const { pathname } = useRouter();
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__top}>
        <h1 className={styles.sidebar__top__title}>{title}</h1>
        <div className={styles.sidebar__top__lists}>
          {lists.map((list, index) => (
            <Link
              href={list.url}
              key={list.title}
              className={`${styles.sidebar__top__lists__item} ${
                pathname === list.url &&
                styles.sidebar__top__lists__item__active
              }`}
            >
              <i className={list.icon}></i>
              <h4 className={styles.sidebar__top__lists__item__title}>
                {list.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.sidebar__bottom}>
        <Button
          type="button"
          variant="secondary"
          onClick={() => signOut()}
          className={styles.sidebar__bottom__button}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
