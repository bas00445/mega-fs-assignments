import { useWeb3React } from "@web3-react/core";
import React from "react";
import { injected } from "../../components/wallet/connectors";
import Web3 from "web3";

function Home() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React<Web3>();

  library?.eth.Contract();

  return <div className="flex flex-col items-center justify-center"></div>;
}

export default Home;
