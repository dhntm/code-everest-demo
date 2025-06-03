import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = 'https://msqgepcljjrcyzqwgujs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcWdlcGNsampyY3l6cXdndWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MDY3OTcsImV4cCI6MjA2NDM4Mjc5N30.PfnxADMYvQkC6S7dnu8Af1HPShGoCDdX85lvCwgwYSA';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey); 