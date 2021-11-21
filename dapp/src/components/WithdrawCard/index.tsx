import { useWeb3React } from "@web3-react/core";
import React, { ComponentPropsWithoutRef, useMemo, useState } from "react";
import Web3 from "web3";
import { ERC20_ABI } from "../../abi";
import { PrimaryButton } from "../../common/styles";
import { COMPOUND_CONTRACT_ADDRESS } from "../../contracts";
import { injected } from "../../wallet/connectors";
import { Container } from "./styled";

interface Props extends ComponentPropsWithoutRef<"div"> {}

export function WithdrawCard({ ...props }: Props) {
  const { active, account, library, activate } = useWeb3React<Web3>();

  const [currency, setCurrency] = useState("ETH");
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);

  return (
    <Container
      className="bg-white shadow px-6 pt-6 pb-9 rounded-lg "
      {...props}
    >
      <div className="w-full">
        <div className="text-2xl text-gray-900 mb-4">Withdraw</div>
        <div className="flex justify-between mb-2">
          <div />
          <div className="justify-self-end text-sm text-gray-500">
            Balance: {balance} ETH
          </div>
        </div>
        <div className="flex gap-2 mb-5">
          <div></div>
          <div className="flex flex-1 relative items-center">
            <div
              className="absolute text-purple-500 text-lg left-3 cursor-pointer"
              onClick={() => {}}
            >
              Max
            </div>
            <input
              type="number"
              value={amount}
              onChange={() => {}}
              className="px-12 text-right bg-gray-100 rounded-lg w-full h-11 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            <div className="absolute text-lg right-3  text-gray-900">
              {currency}
            </div>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-16">
          <div>Receiving</div>
          <div>0 cETH</div>
        </div>
        {active ? (
          <PrimaryButton onClick={() => {}}>Withdraw</PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => {}}>) Unlock Wallet</PrimaryButton>
        )}
      </div>
    </Container>
  );
}
