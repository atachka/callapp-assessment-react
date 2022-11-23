import styled from "styled-components";

const ModalContainer = styled.div`
  .modal-body {
    height: 375px;
    & > form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      label {
        display: flex;
        height: 30px;
        align-items: center;
        & > p {
          width: 60px;
        }
      }
    }
  }
`;

export default ModalContainer;
