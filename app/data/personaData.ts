export const PERSONAS = [
  "Person without 401k",
  "Person with 401k",
  "Young Professional",
  "Mid-Career Parent",
  "Young Professional without 401k",
  "Young Professional with 401k",
  "Mid-Career Parent without 401k",
  "Mid-Career Parent with 401k"
];

export const PERSONA_DATA = {
  "Person without 401k": {
    "risk_profile": "moderate",
    "investment_horizon": "medium-term",
    "financial_data": {
      "monthly_take_home_income": 3800,
      "essential_expenses": 2400,
      "debts": [
        {"name": "Credit Card", "amount": 6500, "apr": 24.99, "payment": {"type": "minimum", "amount": 195}},
        {"name": "Car Loan", "amount": 12000, "apr": 6.5, "payment": {"type": "fixed", "amount": 350}},
        {"name": "Student Loan", "amount": 25000, "apr": 5.8, "payment": {"type": "fixed", "amount": 280}}
      ],
      "additional_financial_factors": {
        "emergency_fund": 2000,
        "monthly_variable_income_from_side_gig": [200, 400],
        "upcoming_expenses": 800,
        "employer_401k_match": "Not available"
      }
    }
  },
  "Person with 401k": {
    "risk_profile": "conservative",
    "investment_horizon": "long-term",
    "financial_data": {
      "monthly_take_home_income": 5000,
      "essential_expenses": 3000,
      "debts": [
        {"name": "Mortgage", "amount": 150000, "apr": 3.5, "payment": {"type": "fixed", "amount": 1200}},
        {"name": "Student Loan", "amount": 20000, "apr": 4.5, "payment": {"type": "fixed", "amount": 300}}
      ],
      "additional_financial_factors": {
        "emergency_fund": 5000,
        "monthly_variable_income_from_side_gig": [0, 0],
        "upcoming_expenses": 1000,
        "employer_401k_match": "3%",
        "retirement_savings": {
          "401k_contribution": 500,
          "current_balance": 15000
        }
      }
    }
  },
  "Young Professional": {
    "risk_profile": "aggressive",
    "investment_horizon": "long-term",
    "financial_data": {
      "monthly_take_home_income": 4500,
      "essential_expenses": 2500,
      "debts": [
        {"name": "Student Loan", "amount": 30000, "apr": 5.0, "payment": {"type": "fixed", "amount": 400}},
        {"name": "Credit Card", "amount": 3000, "apr": 22.0, "payment": {"type": "minimum", "amount": 90}}
      ],
      "additional_financial_factors": {
        "emergency_fund": 1000,
        "monthly_variable_income_from_side_gig": [300, 600],
        "upcoming_expenses": 500,
        "employer_401k_match": "4%"
      }
    }
  },
  "Mid-Career Parent": {
    "risk_profile": "moderate",
    "investment_horizon": "medium-term",
    "financial_data": {
      "monthly_take_home_income": 6000,
      "essential_expenses": 4000,
      "debts": [
        {"name": "Mortgage", "amount": 200000, "apr": 4.0, "payment": {"type": "fixed", "amount": 1500}},
        {"name": "Car Loan", "amount": 10000, "apr": 5.0, "payment": {"type": "fixed", "amount": 300}},
        {"name": "Credit Card", "amount": 5000, "apr": 18.0, "payment": {"type": "minimum", "amount": 150}}
      ],
      "additional_financial_factors": {
        "emergency_fund": 3000,
        "monthly_variable_income_from_side_gig": [0, 0],
        "upcoming_expenses": 1200,
        "employer_401k_match": "5%"
      }
    }
  },
  "Young Professional without 401k": {
    "risk_profile": "aggressive",
    "investment_horizon": "long-term",
    "financial_data": {
      "monthly_take_home_income": 4500,
      "essential_expenses": 2500,
      "debts": [
        {"name": "Student Loan", "amount": 30000, "apr": 5.0, "payment": {"type": "fixed", "amount": 400}},
        {"name": "Credit Card", "amount": 3000, "apr": 22.0, "payment": {"type": "minimum", "amount": 90}}
      ],
      "additional_financial_factors": {
        "emergency_fund": 1000,
        "monthly_variable_income_from_side_gig": [300, 600],
        "upcoming_expenses": 500,
        "employer_401k_match": "Not available"
      }
    }
  },
  "Young Professional with 401k": {
    "risk_profile": "aggressive",
    "investment_horizon": "long-term",
    "financial_data": {
      "monthly_take_home_income": 4500,
      "essential_expenses": 2500,
      "debts": [
        {"name": "Student Loan", "amount": 30000, "apr": 5.0, "payment": {"type": "fixed", "amount": 400}},
        {"name": "Credit Card", "amount": 3000, "apr": 22.0, "payment": {"type": "minimum", "amount": 90}}
      ],
      "additional_financial_factors": {
        "emergency_fund": 1000,
        "monthly_variable_income_from_side_gig": [300, 600],
        "upcoming_expenses": 500,
        "employer_401k_match": "4%",
        "retirement_savings": {
          "401k_contribution": 400,
          "current_balance": 8000
        }
      }
    }
  },
  "Mid-Career Parent without 401k": {
    "risk_profile": "moderate",
    "investment_horizon": "medium-term",
    "financial_data": {
      "monthly_take_home_income": 6000,
      "essential_expenses": 4000,
      "debts": [
        {"name": "Mortgage", "amount": 200000, "apr": 4.0, "payment": {"type": "fixed", "amount": 1500}},
        {"name": "Car Loan", "amount": 10000, "apr": 5.0, "payment": {"type": "fixed", "amount": 300}},
        {"name": "Credit Card", "amount": 5000, "apr": 18.0, "payment": {"type": "minimum", "amount": 150}}
      ],
      "additional_financial_factors": {
        "emergency_fund": 3000,
        "monthly_variable_income_from_side_gig": [0, 0],
        "upcoming_expenses": 1200,
        "employer_401k_match": "Not available"
      }
    }
  },
  "Mid-Career Parent with 401k": {
    "risk_profile": "moderate",
    "investment_horizon": "medium-term",
    "financial_data": {
      "monthly_take_home_income": 6000,
      "essential_expenses": 4000,
      "debts": [
        {"name": "Mortgage", "amount": 200000, "apr": 4.0, "payment": {"type": "fixed", "amount": 1500}},
        {"name": "Car Loan", "amount": 10000, "apr": 5.0, "payment": {"type": "fixed", "amount": 300}},
        {"name": "Credit Card", "amount": 5000, "apr": 18.0, "payment": {"type": "minimum", "amount": 150}}
      ],
      "additional_financial_factors": {
        "emergency_fund": 3000,
        "monthly_variable_income_from_side_gig": [0, 0],
        "upcoming_expenses": 1200,
        "employer_401k_match": "5%",
        "retirement_savings": {
          "401k_contribution": 600,
          "current_balance": 20000
        }
      }
    }
  }
};