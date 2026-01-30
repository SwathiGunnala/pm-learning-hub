import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

export async function analyzeExerciseResponse(
  exerciseContext: string,
  exerciseQuestion: string,
  userResponse: string
): Promise<{ strengths: string[]; improvements: string[]; tip: string }> {
  const systemPrompt = `You are a friendly, encouraging product management mentor. You're reviewing a PM's response to a product thinking exercise. 

Your tone should be:
- Warm and supportive, like a senior PM helping a junior colleague
- Specific and actionable in your feedback
- Honest but kind about areas to improve

Always provide:
1. 2-3 specific things they did well (be genuine, find real strengths)
2. 2-3 areas where they could strengthen their thinking
3. One practical mentor tip they can apply immediately

Format your response as JSON with this structure:
{
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "tip": "A practical tip for becoming a better PM"
}`;

  const userPrompt = `Exercise Context:
${exerciseContext}

Question:
${exerciseQuestion}

PM's Response:
${userResponse}

Please analyze this response and provide feedback in the JSON format specified.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    const parsed = JSON.parse(content);
    return {
      strengths: parsed.strengths || [],
      improvements: parsed.improvements || [],
      tip: parsed.tip || "Keep practicing - every exercise builds your product intuition!",
    };
  } catch (error) {
    console.error("OpenAI error:", error);
    return {
      strengths: [
        "You took the time to think through the problem",
        "You provided a structured response",
      ],
      improvements: [
        "Consider exploring multiple angles before settling on a solution",
        "Try to quantify impact where possible",
      ],
      tip: "When facing product decisions, always start by clarifying the user problem you're solving.",
    };
  }
}

export async function analyzeChallengeResponse(
  scenario: string,
  question: string,
  userResponse: string
): Promise<{ strengths: string[]; improvements: string[]; tip: string }> {
  const systemPrompt = `You are a friendly, encouraging product management mentor reviewing a PM's response to a daily challenge scenario.

Your tone should be:
- Warm and supportive, like a seasoned PM coaching a colleague
- Practical and real-world focused
- Encouraging while being honest

Always provide:
1. 2-3 things they handled well in their approach
2. 1-2 ways they could strengthen their response
3. One practical tip for handling similar situations in real life

Format your response as JSON:
{
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"],
  "tip": "A practical tip for this type of situation"
}`;

  const userPrompt = `Scenario:
${scenario}

Question:
${question}

PM's Response:
${userResponse}

Please analyze this response and provide feedback in the JSON format specified.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    const parsed = JSON.parse(content);
    return {
      strengths: parsed.strengths || [],
      improvements: parsed.improvements || [],
      tip: parsed.tip || "Remember: there's rarely a perfect answer. The goal is thoughtful decision-making.",
    };
  } catch (error) {
    console.error("OpenAI error:", error);
    return {
      strengths: [
        "You engaged with the challenge thoughtfully",
        "You provided a clear response",
      ],
      improvements: [
        "Consider stakeholder perspectives from multiple angles",
        "Think about both short-term and long-term implications",
      ],
      tip: "In stakeholder situations, always start by understanding their underlying needs, not just their stated requests.",
    };
  }
}

export async function chatWithAssistant(
  message: string,
  context: Array<{ role: "user" | "assistant"; content: string }>
): Promise<string> {
  const systemPrompt = `You are a friendly, knowledgeable product management mentor and assistant. Your role is to help users learn about product management concepts, frameworks, strategies, and best practices.

Your style:
- Warm, encouraging, and supportive
- Clear and concise explanations
- Use real-world examples when helpful
- Provide actionable insights
- Keep responses focused and not too long (2-3 paragraphs max unless the topic requires more detail)

Topics you can help with:
- PM frameworks (RICE, MoSCoW, Jobs-to-be-Done, etc.)
- Product strategy and vision
- Prioritization techniques
- Metrics and analytics
- User research methods
- Stakeholder management
- Roadmapping
- Agile/Scrum practices
- Career advice for PMs
- General PM concepts and terminology

If asked about something outside product management, gently redirect the conversation back to PM topics while being helpful.`;

  try {
    const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
      { role: "system", content: systemPrompt },
      ...context.map(msg => ({ role: msg.role as "user" | "assistant", content: msg.content })),
      { role: "user", content: message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || "I'm having trouble thinking right now. Could you try rephrasing your question?";
  } catch (error) {
    console.error("AI Assistant error:", error);
    throw new Error("Failed to get AI response");
  }
}
