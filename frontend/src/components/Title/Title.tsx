import classes from "./Title.module.scss";

type TitleProps = {
  children: string;
};

const Title = ({children}: TitleProps) => {
  return <h1 className={classes.heading}>{children}</h1>
}

export default Title