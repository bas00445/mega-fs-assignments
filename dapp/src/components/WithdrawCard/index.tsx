import { useWeb3React } from "@web3-react/core";
import React, { ComponentPropsWithoutRef, useMemo, useState } from "react";
import Web3 from "web3";
import { ERC20_ABI } from "../../abi";
import { PrimaryButton } from "../../common/styles";
import { COMPOUND_CONTRACT_ADDRESS } from "../../contracts";
import { injected } from "../../wallet/connectors";
import { Container } from "./styled";

interface Props extends ComponentPropsWithoutRef<"div"> {}

export function SupplyCard({ ...props }: Props) {
  const { active, account, library, activate } = useWeb3React<Web3>();

  return <Container></Container>;
}
