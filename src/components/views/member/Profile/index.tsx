import MemberLayout from "@/components/layouts/MemberLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";
import styles from "./Profile.module.scss";

const ProfileMemberView = ({ profile }: any) => {
  return (
    <MemberLayout>
      <h1 className={styles.profile__title}>Member Profile</h1>
      <div className={styles.profile__main}>
        <div className={styles.profile__main__avatar}>
          <Image
            className={styles.profile__main__avatar__image}
            src={profile.image || "/images/default-user.jpg"}
            width={250}
            height={250}
            alt="avatar"
          />
        </div>
        <div className={styles.profile__main__detail}>
          <form action="">
            <Input
              label="Fullname"
              name="fullname"
              type="text"
              defaultValue={profile.fullname}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              defaultValue={profile.email}
            />
            <Input
              label="Phone"
              name="phone"
              type="number"
              defaultValue={profile.phone}
            />
            <Button type="submit">Update Profile</Button>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
