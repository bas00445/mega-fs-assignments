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
  const [amount, setAmount] = useState(0);
  const [userDeposited, setUserDeposited] = useState(0);
  const [temp, setTemp] = useState(0);

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  const compoundContract = useMemo(() => {
    return active
      ? new library.eth.Contract(ERC20_ABI, COMPOUND_CONTRACT_ADDRESS)
      : null;
  }, [library, activate]);

  const getUserSupplied = () => {
    compoundContract.methods
      .balanceOfUnderlying(account)
      .call()
      .then((userDeposited) => {
        console.log({ userDeposited });
        setTemp(userDeposited);
        setUserDeposited(Number(Web3.utils.fromWei(userDeposited)));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const redeemToken = async () => {
    const exchangeRate =
      (await compoundContract.methods.exchangeRateCurrent().call()) / 1e18;

    const amountOfCEthInWei = Number(
      Web3.utils.toWei(amount.toString(), "ether")
    );

    const amountCEth = amountOfCEthInWei / exchangeRate;

    compoundContract.methods
      .redeem(amountCEth.toFixed(0))
      .send({ from: account })
      .then((tx) => {
        console.log({ tx });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAmountInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (value) {
      setAmount(Number(value));
    }
  };

  const handleClickMaxInput = () => {
    setAmount(userDeposited);
  };

  const handleClickUnlockWallet = () => {
    connect();
  };

  const handleClickWithdraw = () => {
    redeemToken();
  };

  React.useEffect(() => {
    if (active) {
      getUserSupplied();
    }
  }, [active]);

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
            Deposited: {userDeposited} ETH
          </div>
        </div>
        <div className="flex gap-2 mb-5">
          <div className="bg-gray-100 rounded-lg flex items-center font-medium justify-center text-gray-900 w-16">
            {currency}
          </div>
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
          <PrimaryButton onClick={handleClickWithdraw}>Withdraw</PrimaryButton>
        ) : (
          <PrimaryButton onClick={handleClickUnlockWallet}>
            ) Unlock Wallet
          </PrimaryButton>
        )}
      </div>
    </Container>
  );
}
