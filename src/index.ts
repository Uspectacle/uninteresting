import { updateNumber } from "./API";
import { wikipediaTitle, wikipediaAny } from "./wikipedia";

const main = async () => {
  try {
    await updateNumber("wikipediaTitle", await wikipediaTitle());
    await updateNumber("wikipedia", await wikipediaAny());
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

main();
