import { useWeb3React } from "@web3-react/core";
import React, { ComponentPropsWithoutRef, useState } from "react";
import Web3 from "web3";
import { ERC20_ABI } from "../../abi";
import { PrimaryButton } from "../../common/styles";
import { COMPOUND_CONTRACT_ADDRESS } from "../../contracts";
import { injected } from "../wallet/connectors";
import { Container } from "./styled";

interface Props extends ComponentPropsWithoutRef<"div"> {}

export function SupplyCard({ ...props }: Props) {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React<Web3>();

  const [currency, setCurrency] = useState("ETH");
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);

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

  const handleAmountInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (Number(value) >= 0) {
      setAmount(Number(event.target.value));
    }
  };

  const getCEthBalance = async () => {
    const compoundContract = new library.eth.Contract(
      ERC20_ABI,
      COMPOUND_CONTRACT_ADDRESS
    );

    return compoundContract.methods
      .balanceOf(account)
      .call()
      .then((balance) => {
        return Web3.utils.fromWei(balance);
      });
  };

  const handleClickMaxInput = () => {};

  const getEthBalance = () => {
    library.eth
      .getBalance(account)
      .then((balance) => {
        setBalance(Number(Web3.utils.fromWei(balance)));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    if (active) {
      getEthBalance();
    }
  }, [active]);

  React.useEffect(() => {
    connect();
  }, []);

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
            Balance: {balance} ETH
          </div>
        </div>
        <div className="flex gap-2 mb-5">
          <div></div>
          <div className="flex flex-1 relative items-center">
            <div
              className="absolute text-purple-500 text-lg left-3 cursor-pointer"
              onClick={handleClickMaxInput}
            >
              Max
            </div>
            <input
              type="number"
              value={amount}
              onChange={handleAmountInputChange}
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
