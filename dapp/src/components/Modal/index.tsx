import React, { ComponentPropsWithoutRef } from "react";
import ReactDOM from "react-dom";

import { ModalContent, ModalOverlay, ModalWrapper } from "./styled";

interface Props extends ComponentPropsWithoutRef<"div"> {
  isShowing: boolean;
  hide: () => void;
}

export function Modal({ isShowing, hide, children }: Props) {
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <ModalOverlay />
          <ModalWrapper aria-modal aria-hidden tabIndex={-1} role="dialog">
            <ModalContent>{children}</ModalContent>
          </ModalWrapper>
        </React.Fragment>,
        document.body
      )
    : null;
}
