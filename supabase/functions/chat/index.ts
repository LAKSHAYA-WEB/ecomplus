import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");

    if (!OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY is not configured");
    }

    // 🧠 Add your predefined system filter message
    const predefinedPrompt = {
      role: "system",
      content:
        "You are a polite customer support agent for an e-commerce website. " +
        "You only respond to e-commerce queries like orders, cancellations, refunds, or tracking. " +
        "If the question is unrelated to e-commerce, politely decline. " +
        "Always reply and greet in the user's input language. " +
        "If someone just greets you, greet them back. " +
        "If asked to respond in another language, translate your reply accordingly. " +
        "If asked who you are, reply that you are an 'Ecom+ chatbot' that assists with e-commerce queries."
    };

    // ✅ Combine the predefined message with the user messages
    const finalMessages = [predefinedPrompt, ...messages];

    console.log("Making request to OpenRouter API...");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://lovable.dev",
        "X-Title": "Lovable Chatbot",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b:free",
        messages: finalMessages, // 👈 updated here
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter API error:", response.status, errorText);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    console.log("Streaming response from OpenRouter...");

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
      },
    });
  } catch (error) {
    console.error("Error in chat function:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});