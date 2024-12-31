import { createClient } from "@supabase/supabase-js";

export type NumberEntry = {
  source: string;
  current_number: number;
  updated_at: string;
};

export default class Client {
  private supabase: any;

  constructor({ url, key }: { url: string; key: string }) {
    this.supabase = createClient(url, key);
  }

  public updateNumber = async (
    source: string,
    currentNumber: number
  ): Promise<void> => {
    try {
      const { error } = await this.supabase
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

  public getNumbers = async (): Promise<NumberEntry[]> => {
    const { data, error } = await this.supabase
      .from("missing_numbers")
      .select("*")
      .order("current_number");

    if (error) throw error;

    return data;
  };
}
