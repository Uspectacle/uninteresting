import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
let supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  dotenv.config();

  supabaseUrl = process.env.SUPABASE_URL;
  supabaseKey = process.env.SUPABASE_KEY;
}

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
