import { BaseButton, InvertedButton, GoogleSignInButton } from "./button.styles.jsx";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  inverted: "inverted",
  google: "google-sign-in",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;
