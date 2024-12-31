import React, { useEffect, useState } from "react";
import { randomKeyframes, randomStyle } from "./RandomCircleStyle";

export const RandomCircle = ({ index }: { index: string | number }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    setStyle(randomStyle(index));

    const styleTag = document.createElement("style");
    styleTag.innerHTML = randomKeyframes(index);
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag); // Clean up on component unmount
    };
  }, []);

  return <div style={style} />;
};
