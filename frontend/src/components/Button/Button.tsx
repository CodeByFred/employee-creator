import React from "react";
import classes from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant: "update" | "create" | "delete" | "contract";
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant,
  type = "button",
}) => {
  return (
    <button
      className={`${classes.button} ${classes[variant]}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
export default Button;
