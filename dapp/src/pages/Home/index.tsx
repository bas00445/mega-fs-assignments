import { useWeb3React } from "@web3-react/core";
import React from "react";
import { injected } from "../../components/wallet/connectors";
import Web3 from "web3";
import { ERC20_ABI } from "../../abi";
import { COMPOUND_CONTRACT_ADDRESS } from "../../contracts";
import { HeaderCardSection } from "../../components/HeaderCardSection";

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
    <div className="h-screen bg-gray-50 flex justify-center">
      <div className="w-4/5">
        <div className="flex gap-6 mb-10">
          <div>Supply</div>
          <div>Withdraw</div>
        </div>
        <div className="flex gap-8 w-full">
          <HeaderCardSection cardTitle="Your Supplied" body="0 ETH" />
          <HeaderCardSection cardTitle="Total Supplied" body="123 ETH" />
          <HeaderCardSection cardTitle="APY" body="100.54%" />
        </div>
      </div>
    </div>
  );
}

export default Home;
