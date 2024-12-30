import React, { useEffect, useState } from "react";
import { randomKeyframes, randomStyle } from "./RandomDigitStyle";

const generateRandomDigit = () => Math.floor(Math.random() * 10).toString();

export const RandomDigit = ({ index }: { index: string | number }) => {
  const [style, setStyle] = useState({});
  const [digit, setDigit] = useState("");

  useEffect(() => {
    setStyle(randomStyle(index));
    setDigit(generateRandomDigit());

    const styleTag = document.createElement("style");
    styleTag.innerHTML = randomKeyframes(index);
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag); // Clean up on component unmount
    };
  }, []);

  return <div style={style}>{digit}</div>;
};
