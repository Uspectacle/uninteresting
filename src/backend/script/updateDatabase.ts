import database from "../api/database";
import { mainSearch } from "../scraper/search";
import { queryTitle, queryAny } from "../scraper/wikipedia";

const main = async () => {
  try {
    console.log("=== Updating wikipediaTitle ===");
    await database.updateNumber(
      "wikipediaTitle",
      await mainSearch({
        minNumber: 2000,
        maxNumber: 10000,
        searchMethod: queryTitle,
      })
    );

    console.log("=== Updating wikipedia ===");
    await database.updateNumber(
      "wikipedia",
      await mainSearch({
        minNumber: 756000,
        maxNumber: 770000,
        searchMethod: queryAny,
      })
    );

    process.exit(0);
  } catch (error) {
    console.error("Error occurred:", error);

    process.exit(1);
  }
};

main();
