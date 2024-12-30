const COLOR = "#9933CC";

const randomState = () => {
  const scaleSeed = Math.random();

  return {
    transform: `scale(${1 + scaleSeed / 3}) translate(${
      Math.random() * 120 - 10
    }vw, ${Math.random() * 120 - 10}vh)`,
    opacity: scaleSeed / 3,
    "text-shadow": `0px 0px ${6 - scaleSeed * 5}px ${COLOR}`,
  };
};

export const randomKeyframes = (index: string | number) => {
  const DefaultState = randomState();

  console.log(DefaultState);

  return `
    @keyframes randomMovement-${index} {
      0% { ${Object.entries(DefaultState)
        .map(([key, value]) => `${key}: ${value}`)
        .join(";")} }
      25% { ${Object.entries(randomState())
        .map(([key, value]) => `${key}: ${value}`)
        .join(";")} }
      50% { ${Object.entries(randomState())
        .map(([key, value]) => `${key}: ${value}`)
        .join(";")} }
      75% { ${Object.entries(randomState())
        .map(([key, value]) => `${key}: ${value}`)
        .join(";")} }
      100% { ${Object.entries(DefaultState)
        .map(([key, value]) => `${key}: ${value}`)
        .join(";")} }
    }
  `;
};

export const randomStyle = (index: string | number) => {
  const animationDuration = Math.random() * 100 + 200;

  return {
    animation: `randomMovement-${index} ${animationDuration}s cubic-bezier(0.4, 0.1, 0.7, 1) infinite`,
    fontSize: `${Math.random() * 4}em`,
    position: "fixed",
    mixBlendMode: "color-burn",
    color: COLOR,
  };
};
