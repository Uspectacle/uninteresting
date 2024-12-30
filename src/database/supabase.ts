import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

let supabaseUrl: string | undefined;
let supabaseKey: string | undefined;

if (import.meta && import.meta.env && import.meta.env.MODE) {
  // Vite environment
  supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
} else {
  // Node.js environment, use dotenv to load .env variables
  dotenv.config();
  supabaseUrl = process.env.SUPABASE_URL;
  supabaseKey = process.env.SUPABASE_KEY;
}

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
