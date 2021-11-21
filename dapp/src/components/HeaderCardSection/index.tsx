import React, { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  cardTitle: React.ReactNode;
  body: React.ReactNode;
}

export function HeaderCardSection({ cardTitle, body, ...props }: Props) {
  return (
    <div className="flex-1 rounded-lg py-3 px-4 bg-white shadow text-gray-900 gap-2">
      <div className="text-base">{cardTitle}</div>
      <div className="text-xl font-medium">{body}</div>
    </div>
  );
}
