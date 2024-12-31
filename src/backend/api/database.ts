import dotenv from "dotenv";
import Client from "../../shared/database";

dotenv.config();

export default new Client({
  url: process.env.SUPABASE_URL || "",
  key: process.env.SUPABASE_KEY || "",
});
