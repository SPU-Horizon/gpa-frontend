import { createClient } from "@supabase/supabase-js";

const options = {
  auth: {
    localStorage: true,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

console.log(import.meta.env.PROD);

const client = createClient(supabaseUrl, supabaseKey, options);

const supabase = () => client;

export default supabase;
