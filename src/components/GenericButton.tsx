import React from "react";
import styles from "../styles/GenericButton.module.css";

const GenericButton: React.FC<{ text: string; onClick?: () => void; classes?: Array<string> | undefined  }> = ({
  text,
  onClick,
  classes
}) => {
 
  let buttonClasses = [styles.button] 
  if(classes) {
    buttonClasses = buttonClasses.concat(classes);
  }
  return (
    <button className={buttonClasses.join(' ')} onClick={onClick}>
      {text}
    </button>
  );
};

export default GenericButton;
