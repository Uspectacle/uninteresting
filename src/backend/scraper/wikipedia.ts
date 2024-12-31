import axios from "axios";
import { handleRateLimit } from "./search";
import { containsNumber } from "./utils";

type WikipediaPage = {
  title: string;
  pageid: number;
};

type WikipediaResponse = {
  query?: {
    pages?: WikipediaPage[];
    search?: WikipediaPage[];
    searchinfo?: {
      totalhits: number;
    };
  };
};

const BASE_URL = "https://en.wikipedia.org/w/api.php";

const query = async (
  params: object,
  retryAttempt: number = 0
): Promise<WikipediaResponse["query"]> => {
  try {
    const response = await axios.get<WikipediaResponse>(BASE_URL, { params });

    if (!response?.data?.query) {
      throw new Error("Corrupted Wikipedia API response");
    }

    return response.data.query;
  } catch (error) {
    retryAttempt = await handleRateLimit(error, retryAttempt);

    return query(params, retryAttempt);
  }
};

export const queryTitle = async (search: string | number): Promise<boolean> => {
  const results = await query({
    action: "query",
    format: "json",
    list: "search",
    titles: `${search}`,
    redirects: 1,
    formatversion: 2,
    srsearch: `intitle:${search}`,
    srnamespace: 0,
    srwhat: "text",
    srsort: "just_match",
  });

  const pages = [...(results?.pages || []), ...(results?.search || [])];

  return pages.some((page) => containsNumber(page.title, search));
};

export const queryAny = async (search: string | number): Promise<boolean> => {
  const results = await query({
    action: "query",
    format: "json",
    list: "search",
    redirects: 1,
    formatversion: 2,
    srsearch: `"${search.toString().trim()}"`,
    srsort: "just_match",
  });

  return !!results?.searchinfo?.totalhits;
};
