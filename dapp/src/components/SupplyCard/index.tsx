import { useWeb3React } from "@web3-react/core";
import React, { ComponentPropsWithoutRef, useMemo, useState } from "react";
import Web3 from "web3";
import { ERC20_ABI } from "../../abi";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";
import { ReactComponent as FailIcon } from "../../assets/icons/fail.svg";
import { ReactComponent as SpinnerIcon } from "../../assets/icons/spinner.svg";
import { PrimaryButton } from "../../common/styles";
import { Modal } from "../../components/Modal";
import useModal from "../../components/Modal/hooks/useModal";
import { RINKEBY_COMPOUND_CONTRACT_ADDRESS } from "../../contracts";
import { State } from "../../types";
import { injected } from "../../wallet/connectors";
import { Container } from "./styled";

interface Props extends ComponentPropsWithoutRef<"div"> {}

export function SupplyCard({ ...props }: Props) {
  const { active, account, library, activate } = useWeb3React<Web3>();

  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [amountCEth, setAmountCEth] = useState(0);
  const [tx, setTx] = useState("");
  const [mintState, setMintState] = useState(State.Idle);

  const { isShowing: isShowingModal, toggle: toggleModal } = useModal();

  const compoundContract = useMemo(() => {
    return active
      ? new library.eth.Contract(ERC20_ABI, RINKEBY_COMPOUND_CONTRACT_ADDRESS)
      : null;
  }, [library, activate]);

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

  const calculateCEthAmount = async () => {
    if (active) {
      const exchangeRate =
        (await compoundContract.methods.exchangeRateCurrent().call()) / 1e18;

      const amountOfCEth = (amount / exchangeRate) * 1e10;
      setAmountCEth(amountOfCEth);
    }
  };

  const handleAmountInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    if (value) {
      setAmount(Number(value));
    }
  };

  const mintToken = () => {
    const weiUnit = Web3.utils.toWei(amount.toString(), "ether");
    toggleModal();
    setMintState(State.Loading);
    compoundContract.methods
      .mint()
      .send({ from: account, value: weiUnit })
      .then((tx) => {
        setMintState(State.Idle);
        setTx(tx.transactionHash);
        console.log({ tx });
      })
      .catch((err) => {
        console.error(err);
        setMintState(State.Error);
      });
  };

  const handleClickMaxInput = () => {
    setAmount(balance);
  };

  const handleClickSupply = () => {
    mintToken();
  };

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

  const disabledSupplyButton = React.useMemo(() => amount <= 0, [amount]);

  React.useEffect(() => {
    if (active) {
      getEthBalance();
    }
  }, [active]);

  React.useEffect(() => {
    calculateCEthAmount();
  }, [amount]);

  const ModalContent = () => (
    <div className="flex flex-col items-center">
      <div className="text-gray-900 text-2xl font-medium mb-4">
        {mintState === State.Loading && "Submitting Transaction..."}
        {mintState === State.Idle && "Transaction Submitted"}
        {mintState === State.Error && "Transaction Failed"}
      </div>
      <div className="mb-6">
        {mintState === State.Loading && (
          <SpinnerIcon className="animate-spin" />
        )}
        {mintState === State.Idle && <CheckIcon />}
        {mintState === State.Error && <FailIcon />}
      </div>
      {mintState === State.Idle && (
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://rinkeby.etherscan.io/tx/${tx}`}
          className="text-blue-600 underline cursor-pointer mb-7"
        >
          View on Etherscan
        </a>
      )}
      {(mintState === State.Idle || mintState === State.Error) && (
        <PrimaryButton onClick={toggleModal}>OK</PrimaryButton>
      )}
    </div>
  );

  return (
    <Container className="bg-white shadow px-6 pt-6 pb-9 rounded-lg" {...props}>
      <div className="w-full">
        <div className="text-2xl text-gray-900 mb-4">Supply</div>
        <div className="flex justify-between mb-2">
          <div />
          <div className="justify-self-end text-sm text-gray-500">
            Balance: {balance} ETH
          </div>
        </div>
        <div className="flex gap-2 mb-5">
          <div className="bg-gray-100 rounded-lg flex items-center font-medium justify-center text-gray-900 w-16">
            ETH
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
            <div className="absolute text-lg right-3 text-gray-900">ETH</div>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-16">
          <div>Receiving</div>
          <div>{amountCEth} cETH</div>
        </div>
        {active ? (
          <PrimaryButton
            onClick={handleClickSupply}
            disabled={disabledSupplyButton}
          >
            Supply
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={handleClickUnlockWallet}>
            Unlock Wallet
          </PrimaryButton>
        )}
      </div>
      <Modal isShowing={isShowingModal} hide={toggleModal}>
        <ModalContent />
      </Modal>
    </Container>
  );
}
