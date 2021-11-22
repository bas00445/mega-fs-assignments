import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
`;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;

  /* Center */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div.attrs({
  className: "rounded-lg px-9 py-6",
})`
  background: white;
  max-width: 500px;
  padding: 2rem;
  min-width: 360px;
`;
