import { NumberEntry } from "../database/API";

export const fetchDescription = async (entry: NumberEntry): Promise<string> => {
  const uri = `text/${entry.source}.md`;

  const response = await fetch(uri);
  if (!response.ok) return "";

  console.log(entry, uri, response.url);

  return response.text();
};
