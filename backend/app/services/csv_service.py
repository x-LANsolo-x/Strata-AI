import csv
import codecs
from fastapi import UploadFile, HTTPException
from app.models.financial import FinancialRecord
from app.models.user import User

async def process_csv_upload(file: UploadFile, user: User):
    """
    Parses a CSV file and creates FinancialRecords.
    Expected columns: month, revenue, expenses, cash_balance
    """
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a CSV.")

    records_created = 0
    errors = []

    try:
        # Read file into memory
        reader = csv.DictReader(codecs.iterdecode(file.file, 'utf-8'))

        for row in reader:
            try:
                # Basic validation & cleaning
                month = row.get("month", "").strip()
                revenue = float(row.get("revenue", 0))
                expenses = float(row.get("expenses", 0))
                cash = float(row.get("cash_balance", 0))

                if not month:
                    continue

                # Check existence
                existing = await FinancialRecord.find_one(
                    FinancialRecord.user.id == user.id,
                    FinancialRecord.month == month
                )
                if existing:
                    # Update existing
                    existing.revenue_recurring = revenue
                    existing.expenses_salaries = expenses  # Simplified mapping
                    existing.cash_balance = cash
                    await existing.save()
                else:
                    # Create new
                    new_rec = FinancialRecord(
                        user=user,
                        month=month,
                        revenue_recurring=revenue,
                        expenses_salaries=expenses,  # Simplified mapping
                        cash_balance=cash
                    )
                    await new_rec.create()

                records_created += 1
            except ValueError:
                errors.append(f"Invalid number format in row: {row}")
            except Exception as e:
                errors.append(f"Error processing row {row}: {str(e)}")

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not parse CSV: {str(e)}")

    return {"processed": records_created, "errors": errors}
