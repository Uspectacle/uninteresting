export const containsNumber = (
  input: string,
  number: string | number
): boolean => {
  const regex = new RegExp(`\\b${number}\\b`);

  return regex.test(input);
};
