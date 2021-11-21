import classNames from "classnames";
import React, { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  activeIndex: number;
  tabs: string[];
  onClickTab: (index: number) => void;
}

export function Tabs({ activeIndex, tabs, onClickTab, ...props }: Props) {
  return (
    <div className="flex gap-6 mb-10" {...props}>
      {tabs.map((tab, index) => (
        <div
          className={classNames("text-2xl p-3 cursor-pointer", {
            "text-purple-700 border-b-2 border-purple-700":
              activeIndex === index,
          })}
          key={`${tab}-${index}`}
          onClick={() => onClickTab(index)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}
