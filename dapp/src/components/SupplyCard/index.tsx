import React, { ComponentPropsWithoutRef } from "react";
import { PrimaryButton } from "../../common/styles";
import { Container } from "./styled";

interface Props extends ComponentPropsWithoutRef<"div"> {}

export function SupplyCard({ ...props }: Props) {
  return (
    <Container
      className="bg-white shadow px-6 pt-6 pb-9 rounded-lg "
      {...props}
    >
      <div className="w-full">
        <div className="text-2xl text-gray-900 mb-4">Supply</div>
        <div className="flex justify-between">
          <div />
          <div className="justify-self-end text-sm text-gray-500">
            Balance: 1.02 ETH
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-16">
          <div>Receiving</div>
          <div>0 cETH</div>
        </div>
        <PrimaryButton>Unlock Wallet</PrimaryButton>
      </div>
    </Container>
  );
}
