import { useWeb3React } from "@web3-react/core";
import React, { useMemo, useState } from "react";
import { injected } from "../../wallet/connectors";
import Web3 from "web3";
import { ERC20_ABI } from "../../abi";
import { RINKEBY_COMPOUND_CONTRACT_ADDRESS } from "../../contracts";
import { HeaderCardSection } from "../../components/HeaderCardSection";
import { SupplyCard } from "../../components/SupplyCard";
import { Tabs } from "../../components/Tabs";

import { commify } from "@ethersproject/units";
import { WithdrawCard } from "../../components/WithdrawCard";

const TABS = ["Supply", "Withdraw"];

function Home() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React<Web3>();

  const [totalSupply, setTotalSupply] = useState(0);
  const [userSupply, setUserSupply] = useState(0);
  const [percentApy, setPercentApy] = useState(0);

  const compoundContract = useMemo(() => {
    return active
      ? new library.eth.Contract(ERC20_ABI, RINKEBY_COMPOUND_CONTRACT_ADDRESS)
      : null;
  }, [library, activate]);

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  const calculateApy = async () => {
    const RinkebySecPerBlock = 15; // 15 seconds
    const RinkebyBlockPerSec = 1 / RinkebySecPerBlock;

    const SecPerYear = 3.156e7;

    const BlockPerYear = RinkebyBlockPerSec * SecPerYear;

    const SupplyRatePerBlock =
      (await compoundContract.methods.supplyRatePerBlock().call()) / 1e18;

    const TotalSuppliedAmount = await compoundContract.methods
      .totalSupply()
      .call(); // Wei unit
    const SupplyAPY = (SupplyRatePerBlock * BlockPerYear) / TotalSuppliedAmount; // In decimal

    console.log({
      SupplyRatePerBlock,
      BlockPerYear,
      TotalSuppliedAmount,
      SupplyAPY: SupplyAPY / 1e18,
    });

    setPercentApy(SupplyAPY * 100);
  };

  const getTotalCEthSupply = () => {
    compoundContract.methods
      .getCash()
      .call()
      .then((supply) => {
        setTotalSupply(Number(Web3.utils.fromWei(supply)));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getUserSupplied = () => {
    compoundContract.methods
      .balanceOfUnderlying(account)
      .call()
      .then((userSupply) => {
        setUserSupply(Number(Web3.utils.fromWei(userSupply)));
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
      getUserSupplied();
      getTotalCEthSupply();
      calculateApy();
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
          <HeaderCardSection
            cardTitle="Your Supplied"
            body={`${commify(userSupply)} ETH`}
          />
          <HeaderCardSection
            cardTitle="Total Supplied"
            body={`${commify(totalSupply)} ETH`}
          />
          <HeaderCardSection
            cardTitle="APY"
            body={`${percentApy.toFixed(2)}%`}
          />
        </div>
        <div className="flex w-full justify-center">
          {activeTabIndex === 0 ? <SupplyCard /> : <WithdrawCard />}
        </div>
      </div>
    </div>
  );
}

export default Home;
