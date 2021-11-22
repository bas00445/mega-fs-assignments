import React, { ComponentPropsWithoutRef } from "react";
import { Container } from "./styled";
import { ReactComponent as FailIcon } from "../../assets/icons/fail.svg";

interface Props extends ComponentPropsWithoutRef<"div"> {
  message?: string;
}

export function WalletError({ message, ...props }: Props) {
  return (
    <Container className="bg-white shadow px-6 pt-6 pb-9 rounded-lg" {...props}>
      <FailIcon className="mb-4" />
      <div className="text-2xl text-red-500 text-center">
        {message || "Something went wrong..."}
      </div>
    </Container>
  );
}
