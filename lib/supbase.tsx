import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eimpamnitishqkxzacur.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpbXBhbW5pdGlzaHFreHphY3VyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDQ5MTgzNywiZXhwIjoyMDYwMDY3ODM3fQ.jK4cP7WnYZ83eUk6CULpfJa-tgMG56NgUfHldhELXv4";

export const supabase = createClient(supabaseUrl, supabaseKey);
