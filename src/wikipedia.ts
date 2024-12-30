import axios from "axios";

// Helper function to check if a string contains a number (word boundary)
const containsNumber = (input: string, number: string | number): boolean => {
  const regex = new RegExp(`\\b${number}\\b`);

  return regex.test(input);
};

// Helper function to wait for a given time in milliseconds
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to check if a Wikipedia article exists for a given ID
const queryTitles = async (
  search: string | number,
  tentative = 0
): Promise<boolean> => {
  const apiUrl = `https://en.wikipedia.org/w/api.php`;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        action: "query",
        format: "json",
        list: "search",
        titles: search,
        redirects: 1,
        formatversion: 2,
        srsearch: "intitle:" + search,
        srnamespace: 0,
        srwhat: "text",
        srsort: "just_match",
      },
    });

    if (!response?.data?.query) throw "corrupted data";

    const pages: any[] = [
      ...response.data.query.pages,
      ...response.data.query.search,
    ];

    return pages.some((page) => containsNumber(page.title, search));
  } catch (error: any) {
    if (tentative > 10) throw error;

    const retryAfter =
      parseInt(error?.response?.headers?.["retry-after"] || "", 10) || 1;
    // Retry after time in seconds
    console.log(`Rate limit hit. Retrying after ${retryAfter} seconds...`);
    await sleep(retryAfter * 1000); // Sleep for the retry time

    return queryTitles(search, tentative + 1); // Retry the request
  }
};

// Function to find the smallest number that is not a Wikipedia article
export const wikipediaTitle = async (
  min: number = 2000,
  max: number = 3000
): Promise<number> => {
  console.time("Execution Time"); // Start the timer

  // Use Promise.all to check multiple numbers concurrently
  const results = await Promise.all(
    Array.from({ length: max - min }, (_, index) =>
      queryTitles((min + index).toString()).then((exists) => ({
        number: min + index,
        exists,
      }))
    )
  );

  // Find the first number that does not exist on Wikipedia
  const missing = results.find((result) => !result.exists);

  if (missing) {
    console.log(
      `The smallest number that is not a Wikipedia article is: ${missing.number}`
    );
    console.timeEnd("Execution Time"); // End the timer

    return missing.number;
  }

  console.log(`All numbers in the range are found in Wikipedia.`);
  console.timeEnd("Execution Time"); // End the timer

  return -1;
};

// Function to check if a Wikipedia article exists for a given ID
const queryAny = async (
  search: string | number,
  tentative = 0
): Promise<boolean> => {
  const apiUrl = `https://en.wikipedia.org/w/api.php`;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        action: "query",
        format: "json",
        list: "search",
        redirects: 1,
        formatversion: 2,
        srsearch: '"' + search.toString().trim() + '"',
        srsort: "just_match",
      },
    });

    if (!response?.data?.query) throw "corrupted data";

    return response.data.query.searchinfo.totalhits;
  } catch (error: any) {
    if (tentative > 10) throw error;

    const retryAfter =
      parseInt(error?.response?.headers?.["retry-after"] || "", 10) || 1;
    // Retry after time in seconds
    console.log(`Rate limit hit. Retrying after ${retryAfter} seconds...`);
    await sleep(retryAfter * 1000); // Sleep for the retry time

    return queryAny(search, tentative + 1); // Retry the request
  }
};

// Function to find the smallest number that is not a Wikipedia article
export const wikipediaAny = async (
  min: number = 757000,
  max: number = 758000
): Promise<number> => {
  console.time("Execution Time"); // Start the timer

  // Use Promise.all to check multiple numbers concurrently
  const results = await Promise.all(
    Array.from({ length: max - min }, (_, index) =>
      queryAny((min + index).toString()).then((exists) => ({
        number: min + index,
        exists,
      }))
    )
  );

  // Find the first number that does not exist on Wikipedia
  const missing = results.find((result) => !result.exists);

  if (missing) {
    console.log(
      `The smallest number that is not on Wikipedia is: ${missing.number}`
    );
    console.timeEnd("Execution Time"); // End the timer

    return missing.number;
  }

  console.log(`All numbers in the range are found in Wikipedia.`);
  console.timeEnd("Execution Time"); // End the timer

  return -1;
};
