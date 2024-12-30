import React, { JSX, useEffect, useState } from "react";
import { RandomCircle } from "./RandomCircle";
import "./background.css";

export const Circles = ({ length }: { length: number }) => {
  const [circles, setCircles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setCircles(
      Array.from({ length }, (_, index) => (
        <RandomCircle key={index} index={index} />
      ))
    );
  }, [length]);

  return <div className="background">{circles}</div>;
};
