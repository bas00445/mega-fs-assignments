import styled from "styled-components";

export const PrimaryButton = styled.button.attrs({
  className:
    "text-center bg-purple-600 py-3 px-6 rounded-lg text-white text-lg w-full focus:ring",
})`
  :disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
