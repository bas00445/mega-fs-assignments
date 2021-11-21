import { useWeb3React } from "@web3-react/core";
import React from "react";
import { injected } from "../../wallet/connectors";
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

  async function disconnect() {
    try {
      console.log("disconnect");
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  React.useEffect(() => {
    connect();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="text-gray-700 text-lg text-center pb-4">{account}</div>
      {active ? (
        <button
          className="p-4 bg-purple-700  text-white rounded-md"
          onClick={handleClickSeeDetail}
        >
          Click to see detail
        </button>
      ) : (
        <button
          className="p-4 bg-purple-700  text-white rounded-md"
          onClick={connect}
        >
          Connect to MetaMask
        </button>
      )}
    </div>
  );
}

export default Home;
