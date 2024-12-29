import { updateNumber } from "./API";

const main = async () => {
  try {
    await updateNumber("wikipedia", Date.now());
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

main();
