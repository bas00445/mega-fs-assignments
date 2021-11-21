import React, { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  cardTitle: React.ReactNode;
  body: React.ReactNode;
}

export function MainCardSection({ title, body }: Props) {
  return (
    <div className="rounded-lg py-3 px-4 bg-white drop-shadow-md text-gray-900 gap-2">
      <div>{title}</div>
      <div>{body}</div>
    </div>
  );
}
