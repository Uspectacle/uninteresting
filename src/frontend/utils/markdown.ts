import { NumberEntry } from "../../shared/database";

export const fetchDescription = async (entry: NumberEntry): Promise<string> => {
  const uri = `text/${entry.source}.md`;

  const response = await fetch(uri);

  if (!response.ok) return "";

  return response.text();
};
