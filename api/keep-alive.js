export default async function handler(req, res) {
  const supabaseUrl = 'https://weejtdwsbnihxxzgoxdd.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlZWp0ZHdzYm5paHh4emdveGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NTQ1NDgsImV4cCI6MjA5ODEzMDU0OH0.C1gEK0lQzPFGAnuMdn87mN-zP1YHmtaXUPFi4UMJqv8';
  
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/firms?select=id&limit=1`, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Supabase returned ${response.status}`);
    }

    res.status(200).json({ success: true, message: 'Supabase ping successful to prevent pausing.' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
