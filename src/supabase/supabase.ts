import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jinggudncxanbgnqxxgp.supabase.co";
const supabaseAnonKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppbmdndWRuY3hhbmJnbnF4eGdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0MzE2MDQsImV4cCI6MjA1NTAwNzYwNH0.EEPWc3wChpdRvUSSqjZ1qB9SiDxbdg-pchxVvYdUySw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
