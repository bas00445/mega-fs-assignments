import React, { ComponentPropsWithoutRef } from "react";
import ReactDOM from "react-dom";

import { ModalContent, ModalOverlay, ModalWrapper } from "./styled";

interface Props extends ComponentPropsWithoutRef<"div"> {
  isShowing: boolean;
  hide: () => void;
}

export function Modal({ isShowing, hide }: Props) {
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <ModalOverlay />
          <ModalWrapper aria-modal aria-hidden tabIndex={-1} role="dialog">
            <ModalContent>
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={hide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <p>Hello, I'm a modal.</p>
            </ModalContent>
          </ModalWrapper>
        </React.Fragment>,
        document.body
      )
    : null;
}
