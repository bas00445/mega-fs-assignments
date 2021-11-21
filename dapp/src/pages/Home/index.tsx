import { useWeb3React } from "@web3-react/core";
import React, { useMemo, useState } from "react";
import { injected } from "../../wallet/connectors";
import Web3 from "web3";
import { ERC20_ABI } from "../../abi";
import { COMPOUND_CONTRACT_ADDRESS } from "../../contracts";
import { HeaderCardSection } from "../../components/HeaderCardSection";
import { SupplyCard } from "../../components/SupplyCard";
import { Tabs } from "../../components/Tabs";

import { commify } from "@ethersproject/units";

const TABS = ["Supply", "Withdraw"];

function Home() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React<Web3>();

  const [totalSupply, setTotalSupply] = useState(0);

  const compoundContract = useMemo(() => {
    return active
      ? new library.eth.Contract(ERC20_ABI, COMPOUND_CONTRACT_ADDRESS)
      : null;
  }, [library, activate]);

  const [activeTabIndex, setActiveTabIndex] = useState(0);

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

  const getTotalCEthSupply = () => {
    compoundContract.methods
      .totalSupply()
      .call()
      .then((supply) => {
        setTotalSupply(supply);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClickTab = (tabIndex: number) => {
    setActiveTabIndex(tabIndex);
  };

  React.useEffect(() => {
    if (active) {
      getTotalCEthSupply();
    }
  }, [active]);

  React.useEffect(() => {
    connect();
  }, []);

  return (
    <div className="h-screen bg-gray-50 flex justify-center">
      <div className="w-4/5 pt-12">
        <Tabs
          tabs={TABS}
          activeIndex={activeTabIndex}
          onClickTab={handleClickTab}
        />
        <div className="flex gap-8 w-full mb-16">
          <HeaderCardSection cardTitle="Your Supplied" body="0 ETH" />
          <HeaderCardSection
            cardTitle="Total Supplied"
            body={`${commify(totalSupply)} ETH`}
          />
          <HeaderCardSection cardTitle="APY" body="100.54%" />
        </div>
        <div className="flex w-full justify-center">
          <SupplyCard />
        </div>
      </div>
    </div>
  );
}

export default Home;
