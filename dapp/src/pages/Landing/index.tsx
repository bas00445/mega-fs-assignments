import React, { ComponentPropsWithoutRef, useState } from "react";
import { Clock, HourLine, MinuteLine, SecondLine } from "./styled";

interface Props extends ComponentPropsWithoutRef<"div"> {}

export function Landing({}: Props) {
  const [secondDeg, setSecondDeg] = useState(0);
  const [minuteDeg, setMinuteDeg] = useState(0);
  const [hourDeg, sethourDeg] = useState(0);

  React.useEffect(() => {
    setInterval(() => {
      const date = new Date();
      let seconds = date.getSeconds();
      let minutes = date.getMinutes();
      let hours = date.getHours() % 12;

      var currentSecondsInDay =
        date.getSeconds() + 60 * minutes + 60 * 60 * hours;

      setSecondDeg(seconds * 6 - 90);
      setMinuteDeg(minutes * 6 - 90);
      sethourDeg(currentSecondsInDay * 0.00833 - 90);
    }, 1000);
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center p-10">
      <Clock>
        <HourLine $deg={hourDeg} />
        <MinuteLine $deg={minuteDeg} />
        <SecondLine $deg={secondDeg} />
      </Clock>
    </div>
  );
}
