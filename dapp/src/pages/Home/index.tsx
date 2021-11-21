import { useWeb3React } from "@web3-react/core";
import React from "react";
import { injected } from "../../components/wallet/connectors";
import Web3 from "web3";
import { ERC20_ABI } from "../../abi";
import { COMPOUND_CONTRACT_ADDRESS } from "../../contracts";

function Home() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React<Web3>();

  const handleClickSeeDetail = () => {
    const compoundContract = new library.eth.Contract(
      ERC20_ABI,
      COMPOUND_CONTRACT_ADDRESS
    );

    compoundContract.methods
      .name()
      .call()
      .then((tx) => {
        console.log({ tx });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center"></div>
  );
}

export default Home;
