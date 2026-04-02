import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const themes: Record<string, string> = {
  battles: "Stories of archers in famous Islamic battles like Badr, Uhud, Yarmuk, or the conquest of Makkah. Focus on the bravery, precision, and faith of the archer companions.",
  training: "Stories about mastering archery through discipline, patience, and consistent practice. Include the spiritual dimensions of training and self-improvement.",
  wisdom: "Stories of master archers teaching their students, passing down the deeper meaning of the art, and the philosophical aspects of archery in Islamic tradition.",
  hunting: "Stories of archers providing for their families and communities through hunting, emphasizing the ethical guidelines and blessings associated with lawful hunting.",
  competitions: "Stories of archery contests, friendly competition between companions, and the pursuit of excellence in the sport as encouraged by the Prophet ﷺ.",
};

const validThemes = new Set(Object.keys(themes));

const systemPrompt = `You are a storyteller specializing in Islamic heritage, particularly the rich traditions of archery among the Sahaba (companions of the Prophet Muhammad ﷺ) and classical Islamic civilization.

Your stories should be:
- Historically grounded in classical texts like "Arab Archery" (Kitab fi Ma'rifat al-Hiyal al-Hurubiyya), "Saracen Archery" (Faris al-Khayyal), and Mamluk Furusiyya manuals
- Inspiring and educational, highlighting the virtues of patience, discipline, and trust in Allah
- Written in an engaging narrative style with vivid descriptions
- 200-300 words in length
- Include authentic names of companions or historical figures when appropriate
- Reference the Prophet's ﷺ encouragement of archery: "Practice archery and horseback riding"

IMPORTANT: You must respond with valid JSON in this exact format:
{ "title": "Story Title Here", "content": "Full story content here..." }

Do not include any text outside the JSON object.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate the user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired session" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { theme } = await req.json();

    // Validate theme input
    const safeTheme = typeof theme === "string" && validThemes.has(theme) ? theme : null;
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const themeDescription = safeTheme && themes[safeTheme] 
      ? themes[safeTheme] 
      : "Any theme related to Islamic archery heritage - battles, training, wisdom, hunting, or competitions.";

    const userPrompt = `Generate a heritage story about Islamic archery with this theme: ${themeDescription}

Remember to respond with valid JSON only: { "title": "...", "content": "..." }`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      console.error("AI gateway error:", response.status);
      return new Response(
        JSON.stringify({ error: "Failed to generate story. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error("No content in AI response");
      return new Response(
        JSON.stringify({ error: "Failed to generate story. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse the JSON response from the AI
    let story;
    try {
      const cleanedContent = content.replace(/```json\n?|\n?```/g, "").trim();
      story = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error("Failed to parse AI response");
      return new Response(
        JSON.stringify({ error: "Failed to generate story. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!story.title || !story.content) {
      return new Response(
        JSON.stringify({ error: "Failed to generate story. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        title: story.title, 
        content: story.content,
        theme: safeTheme || "random"
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("generate-story error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
