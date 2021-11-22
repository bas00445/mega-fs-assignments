import React, { ComponentPropsWithoutRef } from "react";
import ReactDOM from "react-dom";

import { ModalContent, ModalOverlay, ModalWrapper } from "./styled";
import { animated, useTransition } from "react-spring";

interface Props extends ComponentPropsWithoutRef<"div"> {
  isShowing: boolean;
  hide: () => void;
}

export function Modal({ isShowing, hide, children }: Props) {
  const transitionAnim = useTransition(isShowing, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });

  return ReactDOM.createPortal(
    <React.Fragment>
      {transitionAnim(
        (style, item) =>
          item && (
            <animated.div style={style}>
              <ModalOverlay />
              <ModalWrapper aria-modal aria-hidden tabIndex={-1} role="dialog">
                <ModalContent>{children}</ModalContent>
              </ModalWrapper>
            </animated.div>
          )
      )}
    </React.Fragment>,
    document.body
  );
}
