import styles from "./Select.module.scss";

type Option = {
  label: string;
  value: string;
};

type Proptypes = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Option[];
};

const Select = (props: Proptypes) => {
  const { label, name, defaultValue, disabled, options } = props;
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        id={name}
        className={styles.container__select}
      >
        {options.map((option) => (
          <option value={option.value} key={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
