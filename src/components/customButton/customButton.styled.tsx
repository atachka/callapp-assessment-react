import styled, { CSSObject } from "styled-components";

type Props = {
  customStyles?: CSSObject;
  color: string;
};

const CustomButtonContainer = styled.div<Props>`
  ${(props) => props.customStyles};
  min-width: 110px;
  button {
    border: none;
    width: 100%;
  }
  .btn {
    background-color: ${(props) => props.color};
    &:hover {
      opacity: 0.5;
      transition: opacity 0.3s;
    }
    &:active {
      opacity: 1;
      background-color: ${(props) => props.color};
      filter: brightness(60%);
    }
  }
`;

export default CustomButtonContainer;
