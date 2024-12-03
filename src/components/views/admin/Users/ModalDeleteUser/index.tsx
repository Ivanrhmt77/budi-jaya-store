import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import styles from "./ModalDeleteUser.module.scss";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "@/types/user.type";

type Proptypes = {
  deletedUser: User | any;
  setDeletedUser: Dispatch<SetStateAction<{}>>;
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ModalDeleteUser = (props: Proptypes) => {
  const { deletedUser, setDeletedUser, setUsersData, setToaster } = props;
  const session: any = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await userServices.deleteUser(
      deletedUser.id,
      session.data?.accessToken
    );

    if (result.status === 200) {
      setIsLoading(false);
      setDeletedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
      setToaster({ variant: "success", message: "User deleted successfully" });
    } else {
      setIsLoading(false);
      setToaster({ variant: "danger", message: "Failed deleting user" });
    }
  };

  return (
    <Modal onClose={() => setDeletedUser({})}>
      <div className={styles.modal}>
        <h1>Are You Sure?</h1>
        <Button type="button" onClick={() => handleDelete()} variant="danger">
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeleteUser;
