import supabase from "./supabase";

export type NumberEntry = {
  source: string;
  current_number: number;
  updated_at: string;
};

export const updateNumber = async (
  source: string,
  currentNumber: number
): Promise<void> => {
  try {
    const { error } = await supabase
      .from("missing_numbers")
      .update({
        current_number: currentNumber,
        updated_at: new Date().toISOString(),
      })
      .eq("source", source)
      .select();

    if (error) throw error;

    console.info(`Successfully updated number for ${source}:`, currentNumber);
  } catch (error) {
    console.error(`Error updating number for ${source}:`, error);

    throw error;
  }
};

export const getNumbers = async (): Promise<NumberEntry[]> => {
  const { data, error } = await supabase
    .from("missing_numbers")
    .select("*")
    .order("current_number");

  if (error) throw error;

  return data;
};
