from groq import AsyncGroq
from app.core.config import settings

client = AsyncGroq(api_key=settings.GROQ_API_KEY)

async def generate_strategy_ideas(financial_summary: str, startup_context: str) -> str:
    """
    Generates startup strategy ideas using Groq (Llama 3).
    """
    if not settings.GROQ_API_KEY:
        return '{"error": "No AI API Key configured"}'

    prompt = f"""
    You are a startup strategy expert. Analyze the following data and provide 3 actionable pivot or growth strategies.

    FINANCIAL SUMMARY:
    {financial_summary}

    STARTUP CONTEXT:
    {startup_context}

    OUTPUT FORMAT:
    Return ONLY a valid JSON object with a key "suggestions" containing a list of objects.
    Each object must have: 'title', 'description', 'impact_score' (1-10), and 'difficulty' (Low/Medium/High).
    Do not output markdown or explanations, just the JSON.
    """

    try:
        chat_completion = await client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a helpful JSON-speaking startup advisor."},
                {"role": "user", "content": prompt}
            ],
            model=settings.LLM_MODEL,
            response_format={"type": "json_object"},
            temperature=0.7,
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f'{{"error": "{str(e)}"}}'
