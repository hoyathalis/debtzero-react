const promptText = `You are an advanced financial planning AI specializing in sophisticated debt elimination strategies. 
Create a comprehensive 2-month debt elimination strategy that goes BEYOND simple snowball or avalanche methods.

**IMPORTANT:**
- The user has no additional data to provide. Do NOT ask for more information.
- Provide the best possible analysis based on the existing information.
- Provide the complete Strategy and Reasoning for each phase.
- Provide an itemized breakdown in each month's actions detailing how much to pay for each debt.
- **Ensure all calculations are accurate and logically consistent. Double-check success metrics to prevent discrepancies between loan amounts, payment amounts, and payoff durations.**

**TASK:**
Perform the following steps:

1. **Analysis and Insights:**
    - Deliver new insights focusing on:
        - Advanced cash flow optimization techniques
        - Strategic debt targeting based on multiple factors
        - Dynamic income allocation
        - Risk-balanced approach
        - Opportunity cost analysis

2. **Reasoning:**
    - Include a reasoning section in the json
        - Detailed calculations
        - Logical explanations supporting your analysis

3. **Final Output:**
    - Provide the complete JSON output as specified below.
    
**JSON Structure:**
\`\`\`json
        plan: [
                {
                        month: 1,
                        startingDebt: 0,
                        allocatedAmountForDebt: 0,
                        debtDistribution: [
                                {
                                        debtType: "string",
                                        interestRate: 0,
                                        payment: 0,
                                        endingBalance: 0,
                                        notes: "string"
                                }
                        ],
                        totalInterestPaid: 0,
                        remainingDebt: 0,
                        actions: "string"
                }
        ],
        impact: {
                totalMonthsToPayOffAllDebt: 0,
                totalInterestSaved: 0,
                interestSavingsDetails: {
                        debtType1: 0,
                        debtType2: 0
                },
                paymentStability: "string",
                improvedCreditScorePotential: "string",
                monthlyAvailableCash: "string",
                totalDebtReduction: "string"
        },
        success: {
                SuccessByTheNumbers: {
                        DebtReduction: 0,
                        MonthlyDebtPayments: 0,
                        InterestSaved: 0,
                        AdditionalIncome: 0,
                        TotalDebtPaidOff: 0,
                        MonthsToDebtFreedom: 0,
                        MonthlyCashFlowIncrease: 0,
                        AverageInterestRateReduction: 0,
                        TotalInterestPaid: 0,
                        TotalInterestSaved: 0,
                        TotalPaymentsMade: 0,
                        TotalPrincipalPaid: 0
                },
                AdditionalSuccessMetrics: {
                        CreditScoreIncrease: 0,
                        TotalDebtPaidOff: 0,
                        MonthsToDebtFreedom: 0,
                        MonthlyCashFlowIncrease: 0,
                        AverageInterestRateReduction: 0
                }
        },
        reasoning: [
                
        ]

}

**Financial Data:** Will be provided by the USER

`;
const mockResponse = {
    plan: [
        {
            month: 1,
            startingDebt: 43500,
            allocatedAmountForDebt: 8000,
            debtDistribution: [
                {
                    debtType: "Credit Card",
                    interestRate: 24.99,
                    payment: 8000,
                    endingBalance: 0,
                    notes: "Paid off highest-APR debt first (Credit Card at 24.99%)"
                },
                {
                    debtType: "Car Loan",
                    interestRate: 5.5,
                    payment: 500,
                    endingBalance: 11500,
                    notes: "Continued regular payment"
                },
                {
                    debtType: "Student Loan",
                    interestRate: 3.8,
                    payment: 300,
                    endingBalance: 24000,
                    notes: "Continued regular payment"
                }
            ],
            totalInterestPaid: 1200,
            remainingDebt: 33500,
            actions: "Eliminated highest-interest debt while maintaining regular payments on other debts. Pay $8000 for Credit Card, $500 for Car Loan, $300 for Student Loan."
        },
        {
            month: 2,
            startingDebt: 33500,
            allocatedAmountForDebt: 8000,
            debtDistribution: [
                {
                    debtType: "Car Loan",
                    interestRate: 5.5,
                    payment: 8000,
                    endingBalance: 3500,
                    notes: "Significantly reduced car loan balance"
                },
                {
                    debtType: "Student Loan",
                    interestRate: 3.8,
                    payment: 300,
                    endingBalance: 23700,
                    notes: "Continued regular payment"
                }
            ],
            totalInterestPaid: 800,
            remainingDebt: 27200,
            actions: "Further reduced car loan and maintained student loan payments. Pay $8000 for Car Loan, $300 for Student Loan."
        }
    ],
    impact: {
        totalMonthsToPayOffAllDebt: 2,
        totalInterestSaved: 2000,
        interestSavingsDetails: {
            creditCard: 1500,
            carLoan: 300,
            studentLoan: 200
        },
        paymentStability: "Increased payments after eliminating credit card debt",
        improvedCreditScorePotential: "Significant improvement from paying off credit card",
        monthlyAvailableCash: "~$1200 after essential expenses and debt payments",
        totalDebtReduction: "$16,700 in two months"
    },
    success: {
        SuccessByTheNumbers: {
            DebtReduction: 16700,
            MonthlyDebtPayments: 2100,
            InterestSaved: 2500,
            AdditionalIncome: 0,
            TotalDebtPaidOff: 16700,
            MonthsToDebtFreedom: 2,
            MonthlyCashFlowIncrease: 1200,
            AverageInterestRateReduction: 10,
            TotalInterestPaid: 2000,
            TotalInterestSaved: 2500,
            TotalPaymentsMade: 18700,
            TotalPrincipalPaid: 16700
        },
        AdditionalSuccessMetrics: {
            CreditScoreIncrease: 50,
            TotalDebtPaidOff: 16700,
            MonthsToDebtFreedom: 2,
            MonthlyCashFlowIncrease: 1200,
            AverageInterestRateReduction: 10
        }
    }
};

export { promptText, mockResponse };