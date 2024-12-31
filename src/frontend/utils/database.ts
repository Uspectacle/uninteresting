/// <reference types="vite/client" />
import Client from "../../shared/database";

export default new Client({
  url: import.meta.env.VITE_SUPABASE_URL,
  key: import.meta.env.VITE_SUPABASE_KEY,
});
