import json
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.api.v1.deps import get_current_user
from app.models.user import User
from app.services.ai_service import generate_strategy_ideas
from app.models.financial import FinancialRecord
from app.services.runway_engine import calculate_burn_rate, calculate_runway_months

router = APIRouter()


class StrategyRequest(BaseModel):
    context: Optional[str] = None  # User's description of their situation


@router.post("/suggest-strategy")
async def get_ai_suggestions(
    request: StrategyRequest = None,
    current_user: User = Depends(get_current_user)
):
    """
    Generate AI-powered strategy suggestions based on:
    1. User's description of their situation (from request)
    2. Financial data from the database
    """
    
    # 1. Get user's context from request
    user_situation = ""
    if request and request.context:
        user_situation = f"USER'S CURRENT SITUATION:\n{request.context}\n\n"
    
    # 2. Gather Financial Context from database
    latest_record = await FinancialRecord.find(
        FinancialRecord.user.id == current_user.id
    ).sort(-FinancialRecord.month).first_or_none()

    if not latest_record:
        financial_summary = "No financial data available yet. Assume early-stage startup."
    else:
        burn = calculate_burn_rate(latest_record)
        runway = calculate_runway_months(latest_record.cash_balance, burn)
        
        total_revenue = latest_record.revenue_recurring + (latest_record.revenue_one_time or 0)
        total_expenses = (
            latest_record.expenses_salaries + 
            latest_record.expenses_marketing + 
            latest_record.expenses_infrastructure + 
            latest_record.expenses_other
        )
        
        financial_summary = f"""
Cash Balance: ${latest_record.cash_balance:,.0f}
Monthly Revenue: ${total_revenue:,.0f}
Monthly Expenses: ${total_expenses:,.0f}
Monthly Burn Rate: ${burn:,.0f}
Runway: {runway:.1f} months
"""

    # 3. Gather User Profile Context
    user_context = f"Founder: {current_user.full_name or 'Startup Founder'}."

    # 4. Combine all context
    full_context = f"{user_situation}FINANCIAL DATA:\n{financial_summary}"

    # 5. Call AI Service
    raw_json = await generate_strategy_ideas(full_context, user_context)

    # 6. Parse and Return
    try:
        parsed_response = json.loads(raw_json)
        
        # Check for error in response
        if "error" in parsed_response:
            raise HTTPException(status_code=500, detail=parsed_response["error"])
        
        return parsed_response
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned invalid response format.")
