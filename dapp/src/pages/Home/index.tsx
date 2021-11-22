import { commify } from "@ethersproject/units";
import { useWeb3React } from "@web3-react/core";
import React, { useMemo, useState } from "react";
import Web3 from "web3";
import { ERC20_ABI } from "../../abi";
import { HeaderCardSection } from "../../components/HeaderCardSection";
import { Tabs } from "../../components/Tabs";
import { RINKEBY_COMPOUND_CONTRACT_ADDRESS } from "../../contracts";
import { injected } from "../../wallet/connectors";
import { useTabTransition } from "./hooks/useTabTransition";
import { SupplyCardAnim, WithdrawCardAnim } from "./styled";

const TABS = ["Supply", "Withdraw"];

function Home() {
  const { active, account, library, connector, activate, deactivate, error } =
    useWeb3React<Web3>();

  const [totalSupply, setTotalSupply] = useState(0);
  const [userSupply, setUserSupply] = useState(0);
  const [percentApy, setPercentApy] = useState(0);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const transitionAnim = useTabTransition({ activeTabIndex });

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

  const calculateApy = async () => {
    const rinkebySecPerBlock = 13.59; // 13.59 seconds estimated
    const rinkebyBlockPerSec = 1 / rinkebySecPerBlock;
    const rlocksPerDay = 24 * 60 * 60 * rinkebyBlockPerSec;
    const daysInYear = 365;

    const supplyRatePerBlock =
      (await compoundContract.methods.supplyRatePerBlock().call()) / 1e18;

    const apyPercent =
      100 *
      (Math.pow(supplyRatePerBlock * rlocksPerDay + 1, daysInYear - 1) - 1);

    setPercentApy(apyPercent);
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
        <div className="flex gap-8 w-full mb-16 flex-wrap">
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
          {transitionAnim((style, item) =>
            item ? (
              <WithdrawCardAnim
                className="bg-white shadow px-6 pt-6 pb-9 rounded-lg"
                style={style}
              />
            ) : (
              <SupplyCardAnim
                className="bg-white shadow px-6 pt-6 pb-9 rounded-lg"
                style={style}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
