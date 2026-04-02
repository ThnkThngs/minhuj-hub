import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const getSystemPrompt = (frameLabel?: string) => {
  const phaseContext = frameLabel 
    ? `You are analyzing the "${frameLabel}" phase of the archer's shooting sequence. Focus your analysis specifically on what should be happening during this phase.`
    : "";

  return `You are an expert archery coach specializing in traditional Islamic archery techniques from classical manuscripts including "Arab Archery" (15th century Moroccan), "Saracen Archery" (1368 AD Mameluke), and Mamluk Furusiyah literature.

${phaseContext}

Analyze the archer's form in this photo and provide detailed feedback based on these classical techniques:

STANCE TECHNIQUES:
- Mamluk Stance: Feet shoulder-width apart, weight distributed 60/40, stable foundation
- Oblique Stance: Body at 45-degree angle to target for better draw length

DRAWING TECHNIQUES:
- Thumb Draw (Qabda): Thumb hooks the string, index finger locks over thumb
- Khatra: Quick wrist rotation at release for arrow spin

RELEASE TECHNIQUES:
- Clean Release: Gradual finger relaxation for smooth arrow departure
- Dead Release: Complete stillness at release for consistency

AIMING METHODS:
- Instinctive Aiming: Focus entirely on target, subconscious alignment
- Gap Shooting: Using arrow tip as reference point

BREATHING:
- Archer's Breath: Inhale on draw, hold briefly, release on exhale

You MUST respond with valid JSON in this exact format:
{
  "overallScore": <number 1-10>,
  "strengths": ["<strength 1>", "<strength 2>", ...],
  "improvements": ["<improvement 1>", "<improvement 2>", ...],
  "keyRecommendation": "<single most important recommendation>",
  "techniquesIdentified": ["<technique name 1>", "<technique name 2>", ...]
}

Be encouraging but specific. Reference the classical techniques by name. If you cannot clearly see the archer's form, still provide general guidance based on what is visible.`;
};

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

    const { imageData, frameLabel } = await req.json();
    
    if (!imageData) {
      return new Response(
        JSON.stringify({ error: "No image data provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Analyzing archery form for user ${user.id}${frameLabel ? ` - Frame: ${frameLabel}` : ""}...`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: getSystemPrompt(frameLabel) },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: frameLabel 
                  ? `Analyze this "${frameLabel}" phase of the archer's form and provide feedback specific to this moment in the shot sequence.`
                  : "Please analyze this archery form photo and provide feedback based on classical Islamic archery techniques.",
              },
              {
                type: "image_url",
                image_url: {
                  url: imageData,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Failed to analyze image" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      console.error("No content in AI response");
      return new Response(
        JSON.stringify({ error: "No analysis generated" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("AI response received successfully");

    // Parse the JSON response
    let analysis;
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || 
                        content.match(/```\s*([\s\S]*?)\s*```/) ||
                        [null, content];
      const jsonStr = jsonMatch[1] || content;
      analysis = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      analysis = {
        overallScore: 7,
        strengths: ["Good effort captured in this photo"],
        improvements: ["Unable to fully parse detailed feedback - please try again with a clearer photo"],
        keyRecommendation: "Please try again with a clearer photo",
        techniquesIdentified: [],
      };
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-technique function:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
