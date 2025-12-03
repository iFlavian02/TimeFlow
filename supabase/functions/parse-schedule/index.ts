import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { filePath } = await req.json();

    // In a real scenario, you would use the filePath to download the image
    // from Supabase Storage and send it to an AI service.
    // For now, we'll return the same mock data.

    const mockScheduleData = {
      title: "Orar INFO Anul 1, INFO1 Grupa 3 (from Edge Function)",
      validFrom: "29.09.2025",
      validTo: "15.02.2026",
      classes: [
        // MONDAY (Luni)
        {
          day: 'Monday',
          startTime: '08:00',
          endTime: '10:00',
          subject: 'Matematică - Calcul Diferențial și Integral',
          type: 'Curs',
          professor: 'Conf. dr. Arusoaie Andreea, Conf. dr. Zălinescu Adrian',
          room: 'C2',
          frequency: ''
        },
        // ... (add the rest of the mock data here)
      ]
    };

    return new Response(JSON.stringify(mockScheduleData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
