import React, { ComponentPropsWithoutRef } from "react";
import { Container } from "./styled";
import { ReactComponent as FailIcon } from "../../assets/icons/fail.svg";

interface Props extends ComponentPropsWithoutRef<"div"> {
  message?: string;
}

export function WalletError({ message, ...props }: Props) {
  return (
    <Container
      className="bg-white shadow px-6 pt-6 pb-9 rounded-lg flex items-center flex-col"
      {...props}
    >
      <FailIcon className="mb-4" />
      <div className="text-xl text-red-500">
        {message || "Something went wrong...pls check your wallet"}
      </div>
    </Container>
  );
}
