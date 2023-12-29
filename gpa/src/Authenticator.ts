import { createClient } from "@supabase/supabase-js";

const options = {
  auth: {
    localStorage: true,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
};

const supabaseUrl = "https://itbhcggrlntcrgozrapb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0YmhjZ2dybG50Y3Jnb3pyYXBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3MTU0MTksImV4cCI6MjAxOTI5MTQxOX0.wo6hqbNUegnc4bBh26XJ49k4YQiD9p3C-IFFJg_vjPY";

console.log(import.meta.env.VITE_SUPABASE_KEY);
console.log(import.meta.env.VITE_SUPABASE_URL);

const client = createClient(supabaseUrl, supabaseKey, options);

const supabase = () => client;

export default supabase;
