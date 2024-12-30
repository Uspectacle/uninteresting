import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const getEnvVars = () => {
  try {
    // Check for Vite environment
    if (typeof import.meta !== "undefined") {
      return {
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
        supabaseKey: import.meta.env.VITE_SUPABASE_KEY,
      };
    }
  } catch {
    // Ignore import.meta errors
  }

  try {
    // Check for Node environment
    if (typeof process !== "undefined") {
      dotenv.config();
      return {
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseKey: process.env.SUPABASE_KEY,
      };
    }
  } catch {
    // Ignore process errors
  }

  throw new Error("Unable to load environment variables");
};

const { supabaseUrl, supabaseKey } = getEnvVars();

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
