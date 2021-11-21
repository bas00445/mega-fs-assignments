import { useWeb3React } from "@web3-react/core";
import React, { ComponentPropsWithoutRef } from "react";
import Web3 from "web3";
import { PrimaryButton } from "../../common/styles";
import { injected } from "../wallet/connectors";
import { Container } from "./styled";

interface Props extends ComponentPropsWithoutRef<"div"> {}

export function SupplyCard({ ...props }: Props) {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React<Web3>();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  const handleClickUnlockWallet = () => {
    connect();
  };

  return (
    <Container
      className="bg-white shadow px-6 pt-6 pb-9 rounded-lg "
      {...props}
    >
      <div className="w-full">
        <div className="text-2xl text-gray-900 mb-4">Supply</div>
        <div className="flex justify-between mb-2">
          <div />
          <div className="justify-self-end text-sm text-gray-500">
            Balance: 1.02 ETH
          </div>
        </div>
        <div className="flex gap-2 mb-5">
          <div></div>
          <div className="flex-1">
            <input className="pl-12 bg-gray-100 rounded-lg w-full h-11 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-16">
          <div>Receiving</div>
          <div>0 cETH</div>
        </div>
        {active ? (
          <PrimaryButton>Supply</PrimaryButton>
        ) : (
          <PrimaryButton onClick={handleClickUnlockWallet}>
            Unlock Wallet
          </PrimaryButton>
        )}
      </div>
    </Container>
  );
}
