import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const supabaseUrl = "https://eimpamnitishqkxzacur.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpbXBhbW5pdGlzaHFreHphY3VyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDQ5MTgzNywiZXhwIjoyMDYwMDY3ODM3fQ.jK4cP7WnYZ83eUk6CULpfJa-tgMG56NgUfHldhELXv4";

let supa: any = null;
function getSupabase() {
  if (!supa && typeof window !== "undefined") {
    // sólo en navegador
    supa = createClient(supabaseUrl, supabaseKey, {
      // para web, usa localStorage en lugar de AsyncStorage
      auth: {
        storage: window.localStorage,
      },
    });
  } else if (!supa && Platform.OS !== "web") {
    // sólo en móvil
    supa = createClient(supabaseUrl, supabaseKey, {
      auth: {
        storage: AsyncStorage,
        storageKey: "supabase.auth.token",
      },
    });
  }
  return supa;
}
export const supabase = getSupabase();
