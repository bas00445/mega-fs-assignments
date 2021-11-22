import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import React from "react";
import Web3 from "web3";
import "./App.css";
import Home from "./pages/Home";

const RINKEBY_INFURA =
  "https://rinkeby.infura.io/v3/0d2699f0f4864fb5995dfba341f9cc13";

function getLibrary(provider: any) {
  return new Web3(provider);
}

function getPriceFeedLibrary() {
  return new Web3(RINKEBY_INFURA);
}

const Web3PriceFeedProvider = createWeb3ReactRoot("priceFeed");

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3PriceFeedProvider getLibrary={getPriceFeedLibrary}>
        <Home />
      </Web3PriceFeedProvider>
    </Web3ReactProvider>
  );
}

export default App;
