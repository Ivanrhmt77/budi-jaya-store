import Link from "next/link";
import styles from "./Register.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authService from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await authService.registerAccount(data);

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email already exists");
    }
  };

  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText="Sign In"
      labelLinkText="Already have an account?"
    >
      <form onSubmit={handleSubmit}>
        <Input name="email" label="Email" type="email" />
        <Input name="fullname" label="Fullname" type="text" />
        <Input name="phone" label="Phone" type="number" />
        <Input name="password" label="Password" type="password" />
        <Button type="submit" className={styles.register__button}>
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
