import { updateNumber } from "./API";
import { wikipediaTitle, wikipediaAny } from "./wikipedia";

const main = async () => {
  try {
    await updateNumber("wikipediaTitle", await wikipediaTitle());
    await updateNumber("wikipedia", await wikipediaAny());
    process.exit(0);
  } catch (error) {
    console.error("Error occurred:", error); // This will print the error to the logs

    process.exit(1);
  }
};

main();
