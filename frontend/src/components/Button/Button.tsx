import React from "react";
import classes from "./Button.module.scss";

type ButtonProps = {
    children: React.ReactNode;
    onSelect: () => void;
    disabled?: boolean;
    variant:  "update" | "create" | "delete" | "contract"; 
}

const Button: React.FC<ButtonProps> = ({children, onSelect, disabled =false, variant}) => {
  return (
    <button className={`${classes.button} ${classes[variant]}`} onClick={onSelect} disabled={disabled} >{children}</button>
  )
}
export default Button