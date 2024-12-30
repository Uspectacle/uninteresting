import axios from "axios";

// Helper function to check if a string contains a number (word boundary)
const containsNumber = (input: string, number: string | number): boolean => {
  const regex = new RegExp(`\\b${number}\\b`);

  return regex.test(input);
};

// Helper function to wait for a given time in milliseconds
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to check if a Wikipedia article exists for a given ID
const queryTitles = async (titles: string | number): Promise<boolean> => {
  const apiUrl = `https://en.wikipedia.org/w/api.php`;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        action: "query",
        format: "json",
        list: "search",
        titles: titles,
        redirects: 1,
        formatversion: 2,
        srsearch: "intitle:" + titles,
        srnamespace: 0,
        srwhat: "text",
        srsort: "just_match",
      },
    });

    const pages: any[] = [
      ...response.data.query.pages,
      ...response.data.query.search,
    ];

    return pages.some((page) => containsNumber(page.title, titles));
  } catch (error: any) {
    if (error.response?.status === 429) {
      const headers = error.response.headers;
      const retryAfter = parseInt(headers["retry-after"], 10) || 1;
      // Retry after time in seconds
      console.log(`Rate limit hit. Retrying after ${retryAfter} seconds...`);
      await sleep(retryAfter * 1000); // Sleep for the retry time

      return queryTitles(titles); // Retry the request
    }

    throw error; // Rethrow the error if not rate limit related
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
const queryAny = async (search: string | number): Promise<boolean> => {
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

    return response.data.query.searchinfo.totalhits;
  } catch (error: any) {
    if (error.response?.status === 429) {
      const headers = error.response.headers;
      const retryAfter = parseInt(headers["retry-after"], 10) || 1;
      // Retry after time in seconds
      console.log(`Rate limit hit. Retrying after ${retryAfter} seconds...`);
      await sleep(retryAfter * 1000); // Sleep for the retry time

      return queryTitles(search); // Retry the request
    }

    throw error; // Rethrow the error if not rate limit related
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

wikipediaAny();
