import { useWeb3React } from "@web3-react/core";
import React, { ComponentPropsWithoutRef, useMemo, useState } from "react";
import Web3 from "web3";
import { ERC20_ABI } from "../../abi";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";
import { ReactComponent as FailIcon } from "../../assets/icons/fail.svg";
import { ReactComponent as SpinnerIcon } from "../../assets/icons/spinner.svg";
import { PrimaryButton } from "../../common/styles";
import { RINKEBY_COMPOUND_CONTRACT_ADDRESS } from "../../contracts";
import { State } from "../../types";
import { injected } from "../../wallet/connectors";
import { Modal } from "../Modal";
import useModal from "../Modal/hooks/useModal";
import { Container } from "./styled";

interface Props extends ComponentPropsWithoutRef<"div"> {}

export function WithdrawCard({ ...props }: Props) {
  const { active, account, library, activate } = useWeb3React<Web3>();

  const [currency, setCurrency] = useState("ETH");
  const [amount, setAmount] = useState(0);
  const [userDeposited, setUserDeposited] = useState(0);
  const [tx, setTx] = useState("");
  const [redeemState, setRedeemState] = useState(State.Idle);

  const { isShowing: isShowingModal, toggle: toggleModal } = useModal();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  const compoundContract = useMemo(() => {
    return active
      ? new library.eth.Contract(ERC20_ABI, RINKEBY_COMPOUND_CONTRACT_ADDRESS)
      : null;
  }, [library, activate]);

  const getUserSupplied = () => {
    compoundContract.methods
      .balanceOfUnderlying(account)
      .call()
      .then((userDeposited) => {
        setUserDeposited(Number(Web3.utils.fromWei(userDeposited)));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const redeemToken = async () => {
    toggleModal();
    setRedeemState(State.Loading);

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
        setRedeemState(State.Idle);
        setTx(tx.transactionHash);
        console.log({ tx });
      })
      .catch((err) => {
        setRedeemState(State.Error);
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

  const ModalContent = () => (
    <div className="flex flex-col items-center">
      <div className="text-gray-900 text-2xl font-medium mb-4">
        {redeemState === State.Loading && "Submitting Transaction..."}
        {redeemState === State.Idle && "Transaction Submitted"}
        {redeemState === State.Error && "Transaction Failed"}
      </div>
      <div className="mb-6">
        {redeemState === State.Loading && (
          <SpinnerIcon className="animate-spin" />
        )}
        {redeemState === State.Idle && <CheckIcon />}
        {redeemState === State.Error && <FailIcon />}
      </div>
      {redeemState === State.Idle && (
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://rinkeby.etherscan.io/tx/${tx}`}
          className="text-blue-600 underline cursor-pointer mb-7"
        >
          View on Etherscan
        </a>
      )}
      {(redeemState === State.Idle || redeemState === State.Error) && (
        <PrimaryButton onClick={toggleModal}>OK</PrimaryButton>
      )}
    </div>
  );

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
          {/* <div>{amountCEth} cETH</div> */}
        </div>
        {active ? (
          <PrimaryButton onClick={handleClickWithdraw}>Withdraw</PrimaryButton>
        ) : (
          <PrimaryButton onClick={handleClickUnlockWallet}>
            ) Unlock Wallet
          </PrimaryButton>
        )}
      </div>
      <Modal isShowing={isShowingModal} hide={toggleModal}>
        <ModalContent />
      </Modal>
    </Container>
  );
}
