import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import styles from "./ModalDeleteUser.module.scss";
import { useSession } from "next-auth/react";

const ModalDeleteUser = (props: any) => {
  const { deletedUser, setDeletedUser, setUsersData, setToaster } = props;
  const session: any = useSession();

  const handleDelete = async () => {
    userServices.deleteUser(deletedUser.id, session.data?.accessToken);
    setDeletedUser({});
    setToaster({ variant: "success", message: "User deleted successfully" });
    const { data } = await userServices.getAllUsers();
    setUsersData(data.data);
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <div className={styles.modal}>
        <h1>Are You Sure?</h1>
        <Button type="button" onClick={() => handleDelete()} variant="danger">
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeleteUser;
