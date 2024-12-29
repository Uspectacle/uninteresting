import supabase from "./supabase";

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
