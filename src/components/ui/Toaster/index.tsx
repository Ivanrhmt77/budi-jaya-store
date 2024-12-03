import { use, useEffect, useRef, useState } from "react";
import styles from "./Toaster.module.scss";

type Proptypes = {
  variant?: string;
  message?: string;
  setToaster: any;
};

const toasterVariants: any = {
  success: {
    title: "Success",
    icon: "bx bx-check-circle",
    color: "#a3d9a5",
    barColor: "#3f9242",
  },
  danger: {
    title: "Error",
    icon: "bx bx-error-circle",
    color: "#f39b9a",
    barColor: "#bb2525",
  },
};

const Toaster = (props: Proptypes) => {
  const { variant = "success", message, setToaster } = props;
  const [lengthBar, setLengthBar] = useState(100);
  const timerRef = useRef<any>(null);

  const timeStart = () => {
    timerRef.current = setInterval(() => {
      setLengthBar((prev) => prev - 0.14);
    }, 1);
  };

  useEffect(() => {
    timeStart();
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className={`${styles.toaster} ${styles[`toaster--${variant}`]}`}>
      <div className={styles.toaster__main}>
        <div className={styles.toaster__main__icon}>
          <i
            className={toasterVariants[variant].icon}
            style={{ color: toasterVariants[variant].barColor }}
          />
        </div>
        <div className={styles.toaster__main__text}>
          <p className={styles.toaster__main__text__title}>
            {toasterVariants[variant].title}
          </p>
          <p className={styles.toaster__main__text__message}>{message}</p>
        </div>
        <i
          className={`bx bx-x ${styles.toaster__main__close}`}
          onClick={() => setToaster({})}
        />
      </div>
      <div
        className={styles.toaster__timer}
        style={{ backgroundColor: toasterVariants[variant].color }}
      >
        <div
          style={{
            width: `${lengthBar}%`,
            height: "100%",
            backgroundColor: toasterVariants[variant].barColor,
          }}
        />
      </div>
    </div>
  );
};

export default Toaster;
