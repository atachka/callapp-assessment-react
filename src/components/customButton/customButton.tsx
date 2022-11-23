import React, { memo } from "react";
import { CSSObject } from "styled-components";
import CustomButtonContainer from "./customButton.styled";

type ButtonProps = {
  customStyles?: CSSObject;
  handleClick?: () => void;
  text: string;
  color: string;
};

function CustomButton({ customStyles, handleClick, text, color }: ButtonProps) {
  console.log("CUSTOM BUTTON RENDER");
  return (
    <CustomButtonContainer color={color} customStyles={customStyles}>
      <button
        className="btn"
        onClick={() => {
          if (handleClick !== undefined) {
            handleClick();
          }
        }}
      >
        {text}
      </button>
    </CustomButtonContainer>
  );
}

export default memo(CustomButton);
