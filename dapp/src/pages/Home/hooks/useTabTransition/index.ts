import { useTransition } from "@react-spring/core";

const TRANSITION_X_OFFSET = 200;

interface Props {
  activeTabIndex: number;
}

export function useTabTransition({ activeTabIndex }: Props) {
  return useTransition(activeTabIndex, {
    from: {
      position: "absolute",
      opacity: 0,
      x: activeTabIndex ? TRANSITION_X_OFFSET : -TRANSITION_X_OFFSET,
    },
    enter: {
      opacity: 1,
      x: 0,
    },
    leave: {
      opacity: 0,
      x: activeTabIndex ? -TRANSITION_X_OFFSET : TRANSITION_X_OFFSET,
    },
    initial: {
      opacity: 1,
      x: 0,
    },
  });
}
