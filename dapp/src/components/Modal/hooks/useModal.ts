import { useState } from "react";

const useModal = (showing?: boolean) => {
  const [isShowing, setIsShowing] = useState(showing);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  };
};

export default useModal;
