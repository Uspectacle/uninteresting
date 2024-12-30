import supabase from "../supabase";

describe("Environment", () => {
  test("supabase is defined", () => {
    expect(supabase).toBeDefined();
  });

  test("unknown table should return an error", async () => {
    const { data, error } = await supabase.from("unknown_table").select("*");

    // Assert that querying a non-existent table returns an error
    expect(data).toBeNull();
    expect(error).not.toBeNull();
  });

  test("supabase can query database tables", async () => {
    const { data: missingNumbers, error } = await supabase
      .from("missing_numbers")
      .select("*");

    // Assert that there's no error querying the table and data is returned
    expect(error).toBeNull();
    expect(missingNumbers).toBeInstanceOf(Array);
  });
});
