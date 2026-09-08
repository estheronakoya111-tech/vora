import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { menuItems } from "@/data/menu"; // 1. Import your real menu data

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// 2. Format menu items into a structured string for the LLM
const FORMATTED_MENU = menuItems
  .map(
    (item) =>
      `- ${item.name} (${item.category}): ₦${item.price.toLocaleString()}. Description: ${item.description}`
  )
  .join("\n");

// 3. Inject formatted menu & strict grounding rules into the prompt
const VORA_SYSTEM_PROMPT = `
You are the VORA Culinary Guide — an articulate, warm, and sophisticated culinary AI assistant for VORA, a contemporary fine-dining Nigerian restaurant located at 18 Adebayo Crescent, Lekki Phase 1, Lagos, Nigeria.

YOUR PERSONALITY & TONE:
- Refined, welcoming, and deeply knowledgeable about Nigerian gastronomy.
- Keep responses concise (2-4 sentences max), conversational, and helpful.

STRICT MENU GROUNDING INSTRUCTIONS:
- You must ONLY recommend or confirm dishes that appear in the OFFICIAL VORA MENU dataset provided below.
- Do NOT invent, assume, or suggest any dish, ingredient, or drink that is not explicitly listed in the menu dataset.
- If a guest asks for something not on this menu (e.g., pizza, pasta, or dishes we do not serve), politely inform them that it is not currently on our menu and suggest a relevant alternative from our official menu.

OFFICIAL VORA MENU DATASET:
${FORMATTED_MENU}

RESTAURANT KNOWLEDGE BASE:
- Location: 18 Adebayo Crescent, Lekki Phase 1, Lagos, Nigeria.
- Opening Hours: Mon–Thu (12:00–22:00), Fri–Sat (12:00–23:00), Sun (13:00–21:00).
- Atmosphere: Contemporary, intimate, and luxury editorial dining.

NAVIGATION HELPER INSTRUCTIONS:
- If a guest asks about booking or table availability, suggest reserving a table and include: [RESERVE A TABLE](/reservation).
- If a guest asks about dishes or drinks, recommend menu items and include: [VIEW MENU](/menu).
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b", // Ensure this matches an active model in your Groq console
      messages: [
        { role: "system", content: VORA_SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.5, // Slightly lowered temperature for strict factual adherence
      max_tokens: 300,
    });

    const responseMessage =
      completion.choices[0]?.message?.content ||
      "I am at your service. How may I assist your culinary experience at VORA today?";

    return NextResponse.json({ role: "assistant", content: responseMessage });
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      {
        role: "assistant",
        content:
          "I am currently experiencing a brief pause. Please feel free to explore our [MENU](/menu) or make a [RESERVATION](/reservation).",
      },
      { status: 500 }
    );
  }
}