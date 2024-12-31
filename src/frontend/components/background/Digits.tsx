import React, { JSX, useEffect, useState } from "react";
import { RandomDigit } from "./RandomDigit";
import "./background.css";

export const Digits = ({ length }: { length: number }) => {
  const [Digits, setDigits] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setDigits(
      Array.from({ length }, (_, index) => (
        <RandomDigit key={index} index={index} />
      ))
    );
  }, [length]);

  return <div className="background">{Digits}</div>;
};
