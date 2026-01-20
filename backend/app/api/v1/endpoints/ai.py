import json
from fastapi import APIRouter, Depends, HTTPException
from app.api.v1.deps import get_current_user
from app.models.user import User
from app.services.ai_service import generate_strategy_ideas
from app.models.financial import FinancialRecord
from app.services.runway_engine import calculate_burn_rate, calculate_runway_months

router = APIRouter()

@router.post("/suggest-strategy")
async def get_ai_suggestions(current_user: User = Depends(get_current_user)):
    # 1. Gather Financial Context
    latest_record = await FinancialRecord.find(
        FinancialRecord.user.id == current_user.id
    ).sort(-FinancialRecord.month).first_or_none()

    if not latest_record:
        runway_summary = "No financial data available yet."
    else:
        burn = calculate_burn_rate(latest_record)
        runway = calculate_runway_months(latest_record.cash_balance, burn)
        runway_summary = (
            f"Cash Balance: ${latest_record.cash_balance}. "
            f"Monthly Burn: ${burn}. "
            f"Runway: {runway} months."
        )

    # 2. Gather User Context (Placeholder for now, later comes from Startup Profile)
    user_context = f"Founder: {current_user.full_name}. Industry: Tech/SaaS (Default)."

    # 3. Call AI Service
    raw_json = await generate_strategy_ideas(runway_summary, user_context)

    # 4. Parse and Return
    try:
        parsed_response = json.loads(raw_json)
        return parsed_response
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned invalid response format.")
