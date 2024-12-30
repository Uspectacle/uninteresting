type SearchOptions = {
  minNumber?: number;
  maxNumber?: number;
  searchMethod: (search: string) => Promise<boolean>;
};

type SearchResult = {
  number: number;
  exists: boolean;
};

const MAX_RETRIES = 10;
const BATCH_SIZE = 100;

const sleep = async (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const handleRateLimit = async (
  error: any,
  retryAttempt: number
): Promise<number> => {
  if (retryAttempt >= MAX_RETRIES) {
    throw new Error(`Max retry attempts (${MAX_RETRIES}) exceeded: ${error}`);
  }

  const retryAfter = parseInt(
    error?.response?.headers?.["retry-after"] || "1",
    10
  );

  console.log(
    `Retrying after ${retryAfter} seconds... (Attempt ${
      retryAttempt + 1
    }/${MAX_RETRIES}): ${error}`
  );

  await sleep(retryAfter * 1000);

  return retryAttempt + 1;
};

const searchNumbers = async (
  min: number,
  max: number,
  searchMethod: (search: string) => Promise<boolean>
): Promise<SearchResult> => {
  const total = max - min;
  const batches = Math.ceil(total / BATCH_SIZE);

  for (let i = 0; i < batches; i++) {
    const start = min + i * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, max);

    const batch = Array.from(
      { length: end - start },
      (_, index) => start + index
    );

    const results = await Promise.all(
      batch.map((num) =>
        searchMethod(num.toString())
          .then((exists) => ({ number: num, exists }))
          .catch((error) => {
            console.error(`Error searching for number ${num}:`, error);

            return { number: num, exists: true }; // Skip errored numbers
          })
      )
    );

    const missing = results.find((result) => !result.exists);

    if (missing) return missing;

    console.log(`Processed ${end - min} of ${total} numbers...`);
  }

  return { number: -1, exists: true };
};

export const mainSearch = async (options: SearchOptions): Promise<number> => {
  const { minNumber = 0, maxNumber = 1_000_000, searchMethod } = options;

  console.time("Search Duration");

  try {
    const result = await searchNumbers(minNumber, maxNumber, searchMethod);

    if (result.number === -1) {
      console.error(
        `All numbers between ${minNumber} and ${maxNumber} were found.`
      );
    } else {
      console.log(`Found missing number: ${result.number}`);
    }

    return result.number;
  } catch (error) {
    console.error("Error during search:", error);
    throw error;
  } finally {
    console.timeEnd("Search Duration");
  }
};
