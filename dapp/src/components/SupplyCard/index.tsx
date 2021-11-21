import { useWeb3React } from "@web3-react/core";
import React, { ComponentPropsWithoutRef, useMemo, useState } from "react";
import Web3 from "web3";
import { ERC20_ABI } from "../../abi";
import { PrimaryButton } from "../../common/styles";
import { COMPOUND_CONTRACT_ADDRESS } from "../../contracts";
import { injected } from "../../wallet/connectors";
import { Container } from "./styled";
import { debounce } from "lodash-es";
import { Modal } from "../../components/Modal";
import useModal from "../../components/Modal/hooks/useModal";
import { ReactComponent as CheckIcon } from "../../assets/icons/check.svg";

interface Props extends ComponentPropsWithoutRef<"div"> {}

export function SupplyCard({ ...props }: Props) {
  const { active, account, library, activate } = useWeb3React<Web3>();

  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [amountCEth, setAmountCEth] = useState(0);
  const { isShowing: isShowingModal, toggle: toggleModal } = useModal(true);

  const compoundContract = useMemo(() => {
    return active
      ? new library.eth.Contract(ERC20_ABI, COMPOUND_CONTRACT_ADDRESS)
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

  const calculateCEthAmount = debounce(async () => {
    if (active) {
      const exchangeRate = await compoundContract.methods
        .exchangeRateCurrent()
        .call();

      const amountOfCEthInWei = Number(
        Web3.utils.toWei(amount.toString(), "ether")
      );

      const amountCEth = amountOfCEthInWei / exchangeRate;

      console.log({ amountCEth });

      console.log({ amount, amountOfCEthInWei, exchangeRate });
      const result = Web3.utils.fromWei(amountCEth.toFixed(0));
      setAmountCEth(Number(result));
    }
  }, 500);

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
    compoundContract.methods
      .mint()
      .send({ from: account, value: weiUnit })
      .then((tx) => {
        console.log({ tx });
        toggleModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getCEthBalance = async () => {
    compoundContract.methods
      .balanceOf(account)
      .call()
      .then((balance) => {
        Web3.utils.fromWei(balance);
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

  const SuccessModalContent = () => (
    <div className="flex flex-col items-center">
      <div className="text-gray-900 text-2xl font-medium mb-4">
        Transaction Submitted
      </div>
      <CheckIcon className="mb-6" />
      <div className="text-blue-600 underline cursor-pointer mb-7">
        View on Etherscan
      </div>
      <PrimaryButton onClick={toggleModal}>OK</PrimaryButton>
    </div>
  );

  React.useEffect(() => {
    if (active) {
      getEthBalance();
    }
  }, [active]);

  React.useEffect(() => {
    console.log({ amount });
    calculateCEthAmount();
  }, [amount]);

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
          <PrimaryButton onClick={handleClickSupply}>Supply</PrimaryButton>
        ) : (
          <PrimaryButton onClick={handleClickUnlockWallet}>
            Unlock Wallet
          </PrimaryButton>
        )}
      </div>
      <Modal isShowing={isShowingModal} hide={toggleModal}>
        <SuccessModalContent />
      </Modal>
    </Container>
  );
}
