import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.scss";
import Button from "@/components/ui/Button";

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className={styles.navbar}>
      <Button
        type="button"
        onClick={() => (data ? signOut() : signIn())}
        variant="secondary"
      >
        {data ? "Logout" : "Login"}
      </Button>
    </div>
  );
};

export default Navbar;
