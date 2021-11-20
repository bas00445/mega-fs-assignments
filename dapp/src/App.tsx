import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import Web3 from "web3";
import "./App.css";
import Home from "./pages/Home";

function getLibrary(provider: any) {
  return new Web3(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Home />
    </Web3ReactProvider>
  );
}

export default App;
