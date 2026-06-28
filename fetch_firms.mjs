import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://weejtdwsbnihxxzgoxdd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlZWp0ZHdzYm5paHh4emdveGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NTQ1NDgsImV4cCI6MjA5ODEzMDU0OH0.C1gEK0lQzPFGAnuMdn87mN-zP1YHmtaXUPFi4UMJqv8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data, error } = await supabase.from('firms').select('*');
  if (error) console.error("ERROR", error);
  console.log(JSON.stringify(data, null, 2));
}
run();
