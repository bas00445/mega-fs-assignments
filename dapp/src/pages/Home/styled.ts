import styled from "styled-components";
import { animated } from "react-spring";
import { SupplyCard } from "../../components/SupplyCard";
import { WithdrawCard } from "../../components/WithdrawCard";

export const SupplyCardAnim = styled(animated(SupplyCard)).attrs({
  className: "bg-white shadow px-6 py-9 rounded-lg mb-12",
})`
  @media (min-width: 1024px) {
    width: 500px;
  }
`;
export const WithdrawCardAnim = styled(animated(WithdrawCard)).attrs({
  className: "bg-white shadow px-6 py-9 rounded-lg mb-12",
})`
  @media (min-width: 1024px) {
    width: 500px;
  }
`;
